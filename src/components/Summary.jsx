import { Stack , Box , Typography , Button, Alert} from "@mui/material"
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom"
import BookingForm from "./BookingForm";
import CloseIcon from '@mui/icons-material/Close';



const Summary = () => {

  const { name } = useParams();
  const [show , setShow] = useState(null);
  //initialize it with null because initially we don't have any show data.
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false)


  useEffect(()=>{
    fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
    .then((response) => response.json())
    .then((data) => setShow(data[0].show))
  },[name])

  // extract the first show from the data array (data[0].show) and set it as the new value for the show state variable using the setShow function.

  if (!show) {
    return <div>Loading...</div>;
  }

  const handleBookShow = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () =>{
    setIsModalOpen(false)
  }

  const handleFormSubmit = (name, email) => {
    // Save the form data to local storage
    const userData = {
      name,
      email,
      movieName: show.name,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsBookingSuccessful(true);
  };

  return (
    <Box width='100%' height='90vh' sx={{ background: '#ECE6C2'}}>
      <Box>
      <Typography display='flex' alignItems='center' padding='10px' paddingTop='20px' fontSize='30px' fontWeight='bold'>
        Summary for the Movie: <span style={{paddingLeft:'12px' , color: '#CC6B49' , fontSize:'40px'}}>{name}</span>
      </Typography>
    </Box>

    <Stack direction='row' height='60vh' display='flex' justifyContent='flex-start' alignItems='center' marginX='20px' sx={{
      background:'white',
      borderRadius:'20px',
    }}>
      <Box direction='row' paddingLeft= '20px' display='flex' flexDirection='column' justifyContent='center' alignItems='center' flex='2'>
        <img src={show.image?.original} alt="" style={{ width: '200px', height: '300px' , }} />
        <Typography fontWeight='bold' fontSize='20px' mt='20px'>{name}</Typography>
        <Typography><b>Ratings:</b> {show.rating.average ? show.rating.average : "NA"}</Typography>
        <Typography><b>Genre:</b> {show.genres && show.genres.map((genre , index) => (
          <span key={index}>
            {genre}
            {index !== show.genres.length -1 && ', '}
            {/* index !== show.genres.length - 1 condition is used to determine whether to add the comma or not. */}
          </span>
        ))}</Typography>
      </Box>
      <Box overflow='scroll' display='flex' flexDirection='column'
      height='56vh' marginX='60px' flex='15' paddingLeft='20px' justifyContent='flex-start' alignItems='flex-start' sx={{
        background:"#e8e8e8",
        borderRadius: '50px'
      }}>
          
          <Typography fontWeight='bold' fontSize='25px' marginTop='40px'>
            Description:
          </Typography>
          <Typography marginTop='12px'>
            <b>Status:</b> {show.status}
          </Typography>
          <Typography>
            <b>Language:</b> {show.language}
          </Typography>
          <Typography>
            <b>Premiered:</b> {show.premiered}
          </Typography>
          <Typography>
            <b>Network:</b> {show.network?.name ?? "N/A"}
          </Typography>

          <Box marginTop='20px' marginRight='20px'>
          <Typography
                textAlign='justify'
                fontSize='20px'
                > <b>Summary:</b> 
                <Typography  
                textAlign='justify'
                marginTop='-20px'
                fontSize='20px'
                dangerouslySetInnerHTML={{ __html: show.summary }} 
                >
              </Typography>                  
              </Typography>
              
            </Box>
      </Box>
    </Stack>

    <Box marginTop='50px' display='flex' justifyContent='center'>
    <Button  variant='contained' onClick={handleBookShow}>Book Show</Button>
    </Box>

        {/* Render successful message if booking is successful */}
        {isBookingSuccessful && (
        <Box width='400px' display='flex' justifyContent='center' sx={{ position: 'absolute', bottom: 100, right: 570 }}>
          
         <Alert severity="success">This is a success </Alert>
        </Box>
      )}
    
    <BookingForm
        show={show}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onFormSubmit={handleFormSubmit}
      />
    </Box>
  )
}

export default Summary
