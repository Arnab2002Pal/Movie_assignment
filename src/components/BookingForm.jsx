import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';


const BookingForm = ({ show, isOpen, onClose, onFormSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(name, email);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 220,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Button sx={{ position: 'absolute', top: 10, right: 0 }} onClick={onClose}>
            <CloseIcon />
        </Button>
        <Typography><b>Book Movie: </b>{show.name}</Typography>

        <form  onSubmit={handleSubmit}>
          <TextField style={{ marginTop:'20px' }} required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField style={{ marginTop:'20px' }} required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type='submit' sx={{
             marginTop:"20px"
          }} variant='contained'>Submit</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BookingForm;
