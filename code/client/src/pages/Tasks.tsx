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

const Form: FC<{
    isCreating: boolean,
    setError:  React.Dispatch<React.SetStateAction<AlertStateType>>
    setTasksList:  React.Dispatch<React.SetStateAction<Task[]>>
    currentTask: Task,
    userId: number
}> = ({isCreating, setError, setTasksList, currentTask, userId}) => {

    const user = useContext(UserContext)
    const [formData, setFormData] = useState<Task>({
        id: currentTask.id,
        title: currentTask.title,
        description: currentTask.description,
        userId: user.user.id,
        createdAt: new Date(),
        isImportant: false
    })

    const handleFormChange = (field, value) => {
        setFormData({...formData, [field]: value})
    }

    const updateHandle = async () => {
        try {
            const {data: newTask} = await method.task.update(formData);

            setTasksList(prev => [...prev.filter(item => item.id !== currentTask.id), newTask])
        } 
        catch (error) {
            console.error(error)
            setError({message: error.response.data.error?.innerErrors[0].message ?? error.response.data.Message, isVisible: true})
        }
    }

    const createHandle = async () => {
        try {
            const {data: newTask} = await method.task.create({
                userId,
                title: formData.title,
                description: formData.description,
                createdAt: formData.createdAt,
                isImportant: formData.isImportant
            });

            setTasksList(prev => [...prev, newTask])
        } 
        catch (error) {
            console.error(error)
            setError({message: error.response.data.error?.innerErrors[0].message ?? error.response.data.Message, isVisible: true})
        }
    }

    const style = {
        display: "flex", 
        flexDirection: "row", 
        gap: "15px", 
        alignItems: "center",

        "@media screen and (max-width: 576px)": {
            flexDirection: "column",
            alignItems: "left",
        }
    }

    return (<Fragment>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: "center", marginBottom: "50px"}}>
            {isCreating ? "Create" : "Edit"} task
        </Typography>

        <Box sx={{display: "flex", flexDirection: "column", gap: "15px"}}>
            <Box sx={style}>
                <Typography sx={{width: "100px"}}>Title: </Typography>

                <TextField
                    sx={{width: "100%"}}
                    id="name"
                    label="Title"
                    multiline
                    value={formData.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                />
            </Box>

            <Box sx={style}>
                <Typography sx={{width: "100px"}}>Description: </Typography>

                <TextField
                    sx={{width: "100%"}}
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
                <Typography sx={{width: "100px"}}>Date: </Typography>

                <DateSelect value={formData.createdAt} setValue={(value) => handleFormChange("createdAt", value)} label="Date" />
            </Box>}

            <Box sx={style}>
                <Typography sx={{width: "100px"}}>Is Important: </Typography>

                <Checkbox checked={Boolean(formData.isImportant)} onChange={(e) => handleFormChange("isImportant", e.target.checked)} />
            </Box>

            <Button 
                sx={{marginTop: "30px"}} 
                variant="contained" 
                onClick={isCreating ? createHandle : updateHandle}
                disabled={!formData.description.length}
            >
                {isCreating ? "Create" : "Update"}
            </Button>
        </Box>
    </Fragment>)
}

const Tasks: FC<{logout: () => void, user: User}> = ({logout, user}) => {
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
        const {data} = await method.task.get()
        setTasksList(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteHandle = async (id) => {
        try {
            await method.task.delete(id);
            setTasksList(tasksList.filter(task => task.id !== id))
        } 
        catch (error) {
            console.log(error)
        }
    }

    const gridSize = (textLength) => textLength > 450 ? "span 3" : textLength > 50 ? "span 2" : "span 1"
    

    return (<Fragment>
        {user.isAuthenticated && <Box sx={{position: "absolute", top: "15px", right: "15px"}} >
            <Button 
                variant="contained" 
                color="secondary"
                onClick={logout}
            >
                Log out
            </Button>
        </Box>}
        <Box>
            <Button 
            variant="contained" 
            onClick={() => {
                setIsCreating(true)
            }} 
        >
                Create a task
            </Button>
        </Box>
        <Box 
        sx={{
            margin: "50px 0", 
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
                    <Card sx={{gridColumn: gridSize(task.description.length), display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <CardContent sx={{bgcolor: task.isImportant ? "#bcbeff": ""}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {new Date(task.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{margin: "10px 0"}}>
                                {task.title}
                            </Typography>
                            <Typography variant="body2">
                                {task.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{bgcolor: "#1e1e1e"}}>
                            <IconButton 
                                onClick={() => {
                                    setCurrentTask(task)
                                    setIsEditing(true)
                                }}
                            >
                                <EditIcon sx={{color: "#ffffff"}}/>
                            </IconButton>
                            <IconButton onClick={() => deleteHandle(task.id)}>
                                <DeleteIcon sx={{color: "#e04848"}}/>
                            </IconButton>
                        </CardActions>
                    </Card>
                )
            })}
        </Box>

        <ModalComponent isOpen={isCreating || isEditing} setIsOpen={isCreating ? setIsCreating : setIsEditing}>
            <Form userId={user.id} currentTask={currentTask} setTasksList={setTasksList} isCreating={isCreating} setError={setError} />
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