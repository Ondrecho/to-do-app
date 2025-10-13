import { Checkbox, Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material" 
import { Fragment, useEffect, useState, FC, useContext } from "react";
import { method } from "../api/methods";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done'; 
import PushPinIcon from '@mui/icons-material/PushPin'; 
import StarIcon from '@mui/icons-material/Star'; 
import ModalComponent from "../components/utilities/Modal";
import AlertComponent, { AlertTypes, AlertStateType } from "../components/utilities/Alert";
import DateSelect from "../components/utilities/DateSelect";
import { UserContext } from "../Main";
import { User, Task, UserContextType, TaskFilter } from '../api/types'; 
import AddIcon from '@mui/icons-material/Add'; 

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
        isImportant: currentTask.isImportant || false,
        isDone: currentTask.isDone || false 
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
                isImportant: formData.isImportant,
                isDone: false 
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

const Aside: FC<{
    currentFilter: TaskFilter,
    setCurrentFilter: React.Dispatch<React.SetStateAction<TaskFilter>>
}> = ({ currentFilter, setCurrentFilter }) => {
    
    const theme = useTheme();

    const filters: { label: string, filter: TaskFilter, icon: JSX.Element }[] = [
        { label: "Tasks", filter: "all", icon: <PushPinIcon /> },
        { label: "Important", filter: "important", icon: <StarIcon /> },
        { label: "Completed", filter: "completed", icon: <DoneIcon /> },
    ];

    return (
        <Box
            component="aside"
            sx={{
                backgroundColor: theme.palette.mode === 'light' ? '#edd2c4' : '#272727', 
                padding: '20px',
                borderRadius: 3,
                minHeight: '100%', 
                
                '@media screen and (max-width: 991px)': {
                    order: 1,
                },
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    color: theme.palette.mode === 'light' ? '#1e1e1e' : theme.palette.text.primary, 
                    marginBottom: '10px' 
                }}
            >
                Filters
            </Typography>
            <List>
                {filters.map(({ label, filter, icon }) => (
                    <ListItem key={filter} disablePadding>
                        <ListItemButton
                            onClick={() => setCurrentFilter(filter)}
                            selected={currentFilter === filter}
                            sx={{
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.mode === 'light' ? '#e6c3af' : '#444444', 
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'light' ? '#e6c3af' : '#444444',
                                    }
                                }
                            }}
                        >
                            <ListItemIcon 
                                sx={{ 
                                    minWidth: 35, 
                                    color: '#0087d7' 
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText 
                                primary={label} 
                                primaryTypographyProps={{ 
                                    fontWeight: currentFilter === filter ? 'bold' : 'normal',
                                    color: '#0087d7' 
                                }} 
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};


const Tasks: FC<{ user: User, themeMode: 'light' | 'dark' }> = ({ user, themeMode }) => { 
    const [tasksList, setTasksList] = useState<Task[]>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all') 

    const theme = useTheme(); 

    const [currentTask, setCurrentTask] = useState<Task>({
        id: 0,
        title: "",
        description: "",
        userId: user.id,
        createdAt: new Date(),
        isImportant: false,
        isDone: false 
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
    
    const handleDone = async (taskToToggle: Task) => {
        const updatedTask: Task = {
            ...taskToToggle,
            isDone: !taskToToggle.isDone
        };
        
        try {
            const { data } = await method.task.update(updatedTask);
            
            setTasksList(prev => prev.map(task => 
                task.id === updatedTask.id ? data : task
            ));
        } catch (error) {
            console.error("Error updating task status:", error);
            const errorMessage = error.response?.data?.Message ?? "Failed to update task status.";
            setError({ message: errorMessage, isVisible: true });
        }
    };

    const getFilteredTasks = (): Task[] => {
        switch (currentFilter) {
            case 'important':
                return tasksList.filter(task => task.isImportant && !task.isDone);
            case 'completed':
                return tasksList.filter(task => task.isDone);
            case 'all':
            default:
                const notDone = tasksList.filter(task => !task.isDone);
                const done = tasksList.filter(task => task.isDone);
                return [...notDone, ...done];
        }
    };
    
    const filteredTasks = getFilteredTasks(); 

    const gridSize = (textLength: number) => {
        if (textLength > 450) return "span 3";
        if (textLength > 50) return "span 2";
        return "span 1";
    }

    const formatDate = (date: Date | string | undefined): string => {
        if (!date) return 'N/A';
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            if (isNaN(dateObj.getTime())) return 'Invalid Date';
            return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
        } catch (e) {
            return 'Invalid Date';
        }
    };


    const handleCreateTaskClick = () => {
        setCurrentTask({
            id: 0,
            title: "",
            description: "",
            userId: user.id,
            createdAt: new Date(),
            isImportant: false,
            isDone: false 
        })
        setIsCreating(true)
    }

    const getTaskTextColor = (isDone: boolean) => {
        if (isDone) {
            return '#888'; 
        }
        return themeMode === 'light' ? '#121212' : '#ffffff'; 
    };

    const bgImage = themeMode === 'light' ? 'bg-light.jpg' : 'bg-dark.jpg';


    return (<Fragment>
        
        <Box 
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, 
                
                backgroundImage: `url(/${bgImage})`, 
                
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
        </Box>

        <Box
            sx={{
                position: 'fixed', 
                bottom: '30px',
                right: '30px',
                zIndex: 100, 
            }}
        >
            <Button 
                variant="contained" 
                color="primary"
                onClick={handleCreateTaskClick} 
                sx={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    minWidth: 0,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                }}
            >
                <AddIcon />
            </Button>
        </Box>
        
        <Box sx={{ paddingTop: '20px' }}>
            
            <Box 
            sx={{
                display: "grid", 
                minHeight: 'calc(100vh - 100px)', 
                gridTemplateColumns: "250px 1fr", 
                gap: "20px",

                "@media screen and (max-width: 991px)": {
                    gridTemplateColumns: "1fr",
                }
            }}>
                
                <Aside currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
                
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100%', 
                        '@media screen and (max-width: 991px)': {
                            order: 2,
                        },
                    }}
                >
                    
                    <Box 
                        sx={{
                            display: "grid", 
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                            gap: "20px",
                            paddingBottom: '20px',
                        }}
                    >
                        {filteredTasks.map(task => {
                            const isTaskDone = task.isDone;
                            const textColor = getTaskTextColor(isTaskDone); 
                            
                            const cardBg = task.isImportant 
                                ? themeMode === 'light' ? '#fffdbc' : '#2d2d48'
                                : themeMode === 'light' ? '#ffffff' : '#1e1e1e';
                            
                            return (
                                <Card 
                                    key={task.id}
                                    sx={{
                                        gridColumn: gridSize(task.description.length), 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        justifyContent: "space-between",
                                        borderRadius: 3,
                                        backgroundColor: cardBg, 
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
                                        opacity: isTaskDone ? 0.7 : 1, 
                                    }}
                                >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {formatDate(task.createdAt)}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="h5" 
                                            component="div" 
                                            sx={{ 
                                                margin: "10px 0", 
                                                fontWeight: 700,
                                                textDecoration: isTaskDone ? 'line-through' : 'none', 
                                                color: textColor, 
                                            }}
                                        >
                                            {task.title}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="body2"
                                            sx={{
                                                textDecoration: isTaskDone ? 'line-through' : 'none', 
                                                color: textColor, 
                                            }}
                                        >
                                            {task.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ backgroundColor: themeMode === 'light' ? '#f0f0f0' : '#121212' }}>
                                        
                                        <IconButton 
                                            onClick={() => handleDone(task)}
                                        >
                                            <DoneIcon color={isTaskDone ? 'success' : 'action'} />
                                        </IconButton>

                                        <IconButton 
                                            onClick={() => {
                                                setCurrentTask(task)
                                                setIsEditing(true)
                                            }}
                                        >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => deleteHandle(task.id)}>
                                            <DeleteIcon color="secondary"/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            )
                        })}
                    </Box>
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