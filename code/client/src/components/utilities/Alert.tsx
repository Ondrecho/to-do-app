import { Alert, AlertTitle } from "@mui/material";

export enum AlertTypes {
    warning = "warning",
    error = "error",
    info = "info",
    success = "success"
}

export type AlertStateType = {
    isVisible: boolean
    message: string
}


export type ConfirmAlertType = {
    isVisible: boolean
    isConfirm: boolean
}

const AlertComponent: React.FC<{
    message: string, 
    isVisible: boolean, 
    onCloseHandle: () => void, 
    type: AlertTypes
}> = ({message, isVisible, onCloseHandle, type}) => {
    return (<>
        {isVisible && <Alert sx={{position: "fixed", bottom: "15px", left: "15px", width: "calc(100% - 30px)"}} onClose={onCloseHandle} severity={type}>
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>}
    </>)
}

export default AlertComponent