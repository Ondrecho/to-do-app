import { Checkbox, Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fragment, useEffect, useState, FC, useContext } from "react";
import { method } from "../api/methods";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalComponent from "../components/utilities/Modal";
import AlertComponent, { AlertTypes, AlertStateType } from "../components/utilities/Alert";
import DateSelect from "../components/utilities/DateSelect";
import { UserContext } from "../Main";
import { User, Task, UserContextType } from '../api/types';

const Form: FC<{
    isCreating: boolean,
    setError: React.Dispatch<React.SetStateAction<AlertStateType>>
    setTasksList: React.Dispatch<React.SetStateAction<Task[]>>
    currentTask: Task,
    userId: number
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isCreating, setError, setTasksList, currentTask, userId, setIsOpen }) => {

    const userContext = useContext(UserContext) as UserContextType

    if (!userContext || !userContext.user) return null;

    const { user } = userContext;

    const [formData, setFormData] = useState<Task>({
        id: currentTask.id,
        title: currentTask.title || "",
        description: currentTask.description || "",
        userId: user.id,
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
            setIsOpen(false)
        } 
        catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.error?.innerErrors?.[0]?.message ?? error.response?.data?.Message ?? "Unknown error during update.";
            setError({ message: errorMessage, isVisible: true })
        }
    }

    const createHandle = async () => {
        try {
            const { data: newTask } = await method.task.create({
                id: 0,
                userId,
                title: formData.title,
                description: formData.description,
                createdAt: formData.createdAt,
                isImportant: formData.isImportant
            });

            setTasksList(prev => [...prev, newTask])
            setIsOpen(false)
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
                disabled={!formData.title || !formData.description.length}
            >
                {isCreating ? "Create" : "Update"}
            </Button>
        </Box>
    </Fragment>)
}


// УДАЛЕН ПРОП logout
const Tasks: FC<{ user: User }> = ({ user }) => {
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
            const errorMessage = error.response?.data?.Message ?? "Failed to load tasks.";
            setError({ message: errorMessage, isVisible: true });
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteHandle = async (id: number | undefined) => {
        if (!id) return;
        try {
            await method.task.delete(String(id));
            setTasksList(tasksList.filter(task => task.id !== id))
        } 
        catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.Message ?? "Failed to delete task.";
            setError({ message: errorMessage, isVisible: true });
        }
    }
    
    const gridSize = (textLength: number) => {
        if (textLength > 450) return "span 3";
        if (textLength > 50) return "span 2";
        return "span 1";
    }

    const formatDate = (date: Date | string | undefined): string => {
        if (!date) return 'N/A';
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            // Проверка на корректность даты
            if (isNaN(dateObj.getTime())) return 'Invalid Date';
            return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
        } catch (e) {
            return 'Invalid Date';
        }
    };


    return (<Fragment>
        
        <Box 
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, 
                
                backgroundImage: 'url(/background.png)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
        </Box>
        
        <Box sx={{ paddingTop: '20px' }}>
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <Typography variant="h4" gutterBottom>
                    To Do List
                </Typography>
                {/* КНОПКА LOG OUT УДАЛЕНА ИЗ ТЕЛА */}
            </Box>
        
            <Box sx={{ marginBottom: "50px" }}>
                <Button 
                    variant="contained" 
                    onClick={() => {
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
            
            {/* НОВЫЙ GRID LAYOUT для Aside и Списка Задач */}
            <Box 
            sx={{
                display: "grid", 
                gridTemplateColumns: "250px 1fr", // 250px для Aside, остальное для задач
                gap: "20px",

                "@media screen and (max-width: 991px)": {
                    gridTemplateColumns: "1fr", // На маленьких экранах: 1 колонка
                }
            }}>
                
                {/* ASIDE (Сайдбар) */}
                <Box
                    component="aside"
                    sx={{
                        backgroundColor: '#edd2c4', // Заданный цвет
                        padding: '20px',
                        borderRadius: 3,
                        '@media screen and (max-width: 991px)': {
                            order: 1, // Aside сверху на мобильных
                        },
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#1e1e1e', marginBottom: '10px' }}>Filters</Typography>
                    <Typography variant="body1" sx={{ color: '#555' }}>
                        * Filter options will go here *
                    </Typography>
                </Box>
                
                {/* TASK LIST CONTAINER */}
                <Box
                    sx={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                        gap: "20px",
                        '@media screen and (max-width: 991px)': {
                            order: 2, // Задачи снизу на мобильных
                        },
                    }}
                >
                    {tasksList.map(task => {
                        return (
                            <Card 
                                key={task.id}
                                sx={{
                                    gridColumn: gridSize(task.description.length), 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    justifyContent: "space-between",
                                    borderRadius: 3,
                                    backgroundColor: task.isImportant ? "#2d2d48" : "#1e1e1e",
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {formatDate(task.createdAt)}
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
        </Box>


        <ModalComponent isOpen={isCreating || isEditing} setIsOpen={isCreating ? setIsCreating : setIsEditing}>
            <Form 
                userId={user.id} 
                currentTask={currentTask} 
                setTasksList={setTasksList} 
                isCreating={isCreating} 
                setError={setError} 
                setIsOpen={isCreating ? setIsCreating : setIsEditing}
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