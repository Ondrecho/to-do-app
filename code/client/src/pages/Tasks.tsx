import { Checkbox, Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography, Container, Fab } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Fragment, useEffect, useState, FC, useContext } from "react";
import { method } from "../api/methods";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalComponent from "../components/utilities/Modal";
import AlertComponent, { AlertTypes, AlertStateType } from "../components/utilities/Alert";
import DateSelect from "../components/utilities/DateSelect";
import { UserContext } from "../Main";
import { User, Task, UserContextType } from '../api/types'; // Добавлен UserContextType

const Form: FC<{
    isCreating: boolean,
    setError: React.Dispatch<React.SetStateAction<AlertStateType>>
    setTasksList: React.Dispatch<React.SetStateAction<Task[]>>
    currentTask: Task,
    userId: number
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>> // Добавлен пропс для закрытия модального окна
}> = ({ isCreating, setError, setTasksList, currentTask, userId, setIsOpen }) => {

    const userContext = useContext(UserContext) as UserContextType // Приводим тип к UserContextType

    if (!userContext || !userContext.user) return null;

    const { user } = userContext; 

    const [formData, setFormData] = useState<Task>({
        id: currentTask.id,
        title: currentTask.title || "", // Инициализация пустой строкой, если нет значения
        description: currentTask.description || "",
        userId: user.id, // Используем user.id
        createdAt: currentTask.createdAt || new Date(),
        isImportant: currentTask.isImportant || false
    })

    const handleFormChange = (field: keyof Task, value: any) => {
        setFormData({ ...formData, [field]: value })
    }

    const updateHandle = async () => {
        try {
            const { data: newTask } = await method.task.update(formData);

            setTasksList(prev => [...prev.filter(item => item.id !== currentTask.id), newTask])
            setIsOpen(false) // Закрываем модальное окно после успеха
        } 
        catch (error) {
            console.error(error)
            // Улучшенная обработка ошибок (используя Optional Chaining)
            const errorMessage = error.response?.data?.error?.innerErrors?.[0]?.message ?? error.response?.data?.Message ?? "Unknown error during update.";
            setError({ message: errorMessage, isVisible: true })
        }
    }

    const createHandle = async () => {
        try {
            const { data: newTask } = await method.task.create({
                userId,
                title: formData.title,
                description: formData.description,
                createdAt: formData.createdAt,
                isImportant: formData.isImportant
            });

            setTasksList(prev => [...prev, newTask])
            setIsOpen(false) // Закрываем модальное окно после успеха
        } 
        catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.error?.innerErrors?.[0]?.message ?? error.response?.data?.Message ?? "Unknown error during creation.";
            setError({ message: errorMessage, isVisible: true })
        }
    }

    const style = {
        display: "flex", 
        flexDirection: "row", 
        gap: "15px", 
        alignItems: "center",

        "@media screen and (max-width: 576px)": {
            flexDirection: "column",
            alignItems: "flex-start",
        }
    }

    return (<Fragment>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "50px" }}>
            {isCreating ? "Create" : "Edit"} task
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Box sx={style}>
                <Typography sx={{ width: "100px" }}>Title: </Typography>

                <TextField
                    sx={{ width: "100%" }}
                    id="name"
                    label="Title"
                    multiline
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                />
            </Box>

            <Box sx={style}>
                <Typography sx={{ width: "100px" }}>Description: </Typography>

                <TextField
                    sx={{ width: "100%" }}
                    id="description"
                    label="Description"
                    multiline
                    minRows={3}
                    maxRows={30}
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                />
            </Box>

            {isCreating && <Box sx={style}>
                <Typography sx={{ width: "100px" }}>Date: </Typography>
                <DateSelect 
                    value={formData.createdAt as Date} 
                    setValue={(value) => handleFormChange("createdAt", value)} 
                    label="Date" 
                />
            </Box>}

            <Box sx={style}>
                <Typography sx={{ width: "100px" }}>Is Important: </Typography>
                
                <Checkbox 
                    checked={Boolean(formData.isImportant)} 
                    onChange={(e) => handleFormChange("isImportant", e.target.checked)} 
                />
            </Box>

            <Button 
                sx={{ marginTop: "30px" }} 
                variant="contained" 
                onClick={isCreating ? createHandle : updateHandle}
                disabled={!formData.title || !formData.description.length} // Проверка на title и description
            >
                {isCreating ? "Create" : "Update"}
            </Button>
        </Box>
    </Fragment>)
}
const Tasks: FC<{ logout: () => void, user: User }> = ({ logout, user }) => {
    const [tasksList, setTasksList] = useState<Task[]>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const [currentTask, setCurrentTask] = useState<Task>({
        id: 0,
        title: "",
        description: "",
        userId: user.id,
        createdAt: new Date(),
        isImportant: false
    })

    const [error, setError] = useState<AlertStateType>({
        isVisible: false,
        message: ""
    })

    const fetchData = async () => {
        try {
            const { data } = await method.task.get()
            setTasksList(data)
        } catch (error) {
            console.error("Error fetching tasks:", error);
            // Обработка ошибки загрузки
            const errorMessage = error.response?.data?.Message ?? "Failed to load tasks.";
            setError({ message: errorMessage, isVisible: true });
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteHandle = async (id: number | undefined) => { // id может быть undefined
        if (!id) return;
        try {
            await method.task.delete(String(id)); // API требует строку
            setTasksList(tasksList.filter(task => task.id !== id))
        } 
        catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.Message ?? "Failed to delete task.";
            setError({ message: errorMessage, isVisible: true });
        }
    }
    
    // Использование template string, так как gridSize требует строковый вывод для gridColumn
    const gridSize = (textLength: number) => {
        if (textLength > 450) return "span 3";
        if (textLength > 50) return "span 2";
        return "span 1";
    }

    return (<Fragment>
        
        <Box 
            sx={{
                // Применение фона на главную страницу
                backgroundImage: 'url(/background.jpg)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', 
                minHeight: 'calc(100vh - 80px)', // Высота минус хедер (примерная высота AppBar)
                padding: '20px', 
            }}
        >
        
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <Typography variant="h4" gutterBottom>
                    To Do List
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={logout}
                >
                    Log out
                </Button>
            </Box>
        
            <Box sx={{ marginBottom: "50px" }}>
                <Button 
                    variant="contained" 
                    onClick={() => {
                        // Сброс currentTask для создания
                        setCurrentTask({
                            id: 0,
                            title: "",
                            description: "",
                            userId: user.id,
                            createdAt: new Date(),
                            isImportant: false
                        })
                        setIsCreating(true)
                    }} 
                >
                    Create a task
                </Button>
            </Box>

            <Box 
            sx={{
                display: "grid", 
                gridTemplateColumns: "1fr 1fr 1fr", 
                gap: "20px",

                "@media screen and (max-width: 991px)": {
                    gridTemplateColumns: "1fr 1fr", 
                },
                "@media screen and (max-width: 767px)": {
                    display: "flex",
                    flexDirection: "column", 
                }
            }}>
                {tasksList.map(task => {
                    return (
                        <Card 
                            key={task.id}
                            sx={{
                                gridColumn: gridSize(task.description.length), 
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "space-between",
                                // Стиль карточки
                                borderRadius: 3, // Большее закругление
                                backgroundColor: task.isImportant ? "#848600ff" : "#1e1e1e", // Более темный фон для "важных" задач
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {new Date(task.createdAt || "").toLocaleString()}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ margin: "10px 0", fontWeight: 700 }}>
                                    {task.title}
                                </Typography>
                                <Typography variant="body2">
                                    {task.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ backgroundColor: '#121212' }}>
                                <IconButton 
                                    onClick={() => {
                                        setCurrentTask(task)
                                        setIsEditing(true)
                                    }}
                                >
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => deleteHandle(task.id)}>
                                    <DeleteIcon sx={{ color: "#e04848" }}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                })}
            </Box>

        </Box> 

        <ModalComponent isOpen={isCreating || isEditing} setIsOpen={isCreating ? setIsCreating : setIsEditing}>
            <Form 
                userId={user.id} 
                currentTask={currentTask} 
                setTasksList={setTasksList} 
                isCreating={isCreating} 
                setError={setError} 
                setIsOpen={isCreating ? setIsCreating : setIsEditing} // Передаем функцию закрытия
            />
        </ModalComponent>

        <AlertComponent 
            type={AlertTypes.error} 
            message={error.message} 
            isVisible={error.isVisible} 
            onCloseHandle={() => setError({message: "", isVisible: false})}
        />
    </Fragment>
    )
}

export default Tasks