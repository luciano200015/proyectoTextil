import React from 'react'
import{Modal,Box,Grid,List,Paper} from'@mui/material'

export const ModalBa = ({open,handleClose,container}) => {
  return (
    <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box  component={Paper} sx={style}>
            <Grid container >
              <List sx={{
                position: 'relative',
                overflow: 'auto',
                height: '66vh',
                width:'100%'
              }}>
              {container}
              </List>
              
            </Grid>
        </Box>
      </Modal>
  )
}


const style = {
  position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   border: '2px ',
   boxShadow: 24,
   p: 1,
   width:'80%',
   height:'76%'
};