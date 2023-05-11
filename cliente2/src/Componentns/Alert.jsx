import React from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const AlertComponent = ({message,error,seterror,severity}) => {

    return (
            <Box sx={{ width: '100%' }}>
                <Collapse in={error}>
                    <Alert severity={severity}
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            seterror(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    {message}
                    </Alert>
                </Collapse>
            </Box>
    )
}

export default AlertComponent
