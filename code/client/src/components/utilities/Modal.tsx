import {  Box, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = ({isOpen, setIsOpen, children}) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,

        "@media screen and (max-width: 767px)": {
            width: "90%",
            left: "5%",
            transform: 'translate(0%, -50%)',
            height: "calc(100% - 50px)",
            overflow: "auto",
        }
    };

    const handleClose = () => setIsOpen(false);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton sx={{position: "absolute", top: "10px", right: "10px"}} aria-label="delete" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                {children}
            </Box>
        </Modal>
    )
}

export default ModalComponent;
