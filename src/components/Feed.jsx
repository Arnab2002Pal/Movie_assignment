import { Stack , Box , Typography , Button } from "@mui/material"
import { useState , useEffect } from "react"
import { Link } from "react-router-dom"

const Feed = () => {

    const [list , setList] = useState([])

    useEffect(() =>{
        fetch("https://api.tvmaze.com/search/shows?q=all")
        .then((response) => response.json())
        .then((data) => {
            setList(data)
        })
        .catch((error)=>{
            console.error('Error during the fetch', error);
        })
    },[])

  return (

    <Box height="100%" sx={{
        paddingTop:'20px',
        paddingBottom:'20px',
        background:'#ECE6C2',
        
    }}>
        <Typography
        fontFamily="Righteous"
        letterSpacing={3}
        textAlign='center' 
        variant="h3" 
        sx={{ 
            fontWeight: 'bold',
            color: "#575757" }}>
            ..Movie List..
        </Typography>
    
    
    {list.map((lists) => (
        <Stack 
        key={lists.show.id}
        display='flex' 
        flexWrap='wrap'
        direction='row' 
        width="90%" 
        justifyContent='space-evenly' 
        alignItems='center' 
        margin='auto' 
        marginY='20px'
        height='300px' 
        sx={{
            borderRadius: '20px',
            background: '#D2A24C',
        }}>
            <Box 
            display='flex'
            flex='2'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            borderRadius='20px'
            sx={{
                background:"white",
                marginX:'40px',
                paddingY:'5px',
                
            }}
            >
            <img
              src={lists.show.image?.medium}
              alt={lists.show.name}
              style={{ width: "150px", height: "200px" , marginTop: '10px'}}
            />
                <Typography fontSize="15px" mt="10px">
                    Ratings: {lists.show.rating.average ? lists.show.rating.average : "NA"}
                </Typography>

                <Typography fontWeight='bold'fontSize='20px'>{lists.show.name}</Typography>
                
                
            </Box>
            <Box display='flex'
            flex='5'
            justifyContent='center'
            alignItems='center'
            height="150px"
            paddingX='10px'
            borderRight='2px #dedede solid'
            borderLeft='2px #dedede solid'>
            
            <Typography
                color='white'
                textAlign='justify'
                fontSize='20px'
                dangerouslySetInnerHTML={{ __html: lists.show.summary }}
                
                // By setting the dangerouslySetInnerHTML prop to an object with the __html property containing the summary text, it will render the HTML tags properly. 


                ></Typography>
            </Box>
            <Box display='flex'
            flex='1'
            justifyContent='center'
            alignItems='center'>
                <Button variant='contained'>
              <Link to={`/summary/${lists.show.name}`}
              style={{
                color:'white',
                textDecoration: "none"
              }}
              >
                View Summary
              </Link>
              </Button>
            </Box>
            
            </Stack>
        ))}
    
    </Box>
  )
}

export default Feed
