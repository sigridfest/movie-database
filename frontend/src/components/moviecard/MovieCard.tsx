import { useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import "./MovieCard.css";
import Card from '@mui/material/Card';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AddUserFavorite, RemoveUserFavorite, CheckUserFavorites } from "../../api/UserQuery"
import useUserStore from '../../store';
import { Link } from 'react-router-dom';


// The styling for the favorite-button
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


export const MovieCard = ({movie} : {movie:any}) => { 
    
    const {title, rating, img} = movie;
    const username = useUserStore(state => state.user)
    // Checks if not logged in, to hide favorites-button
    const isLoggedIn = useUserStore(state => state.loggedIn)
    // Set and remove favorites from API
    const [setFavoriteAPI, setFavoriteAPIExecution] = AddUserFavorite()
    const [removeFavoriteAPI, removeFavoriteAPIExecution] = RemoveUserFavorite()
    const userFavorites = CheckUserFavorites(username, title)
    // Boolean value that track if the movie is favorited by the current user
    const [isFavorite, setFavorite] = useState<boolean>(false)
    // Number value that sets the color of button
    const [defaultFavorite, setDefaultFavorite] = useState<number>(0)
    const [movieTitle, updateMovieTitle] = useUserStore((state) =>[state.movieTitle, state.updateMovieTitle]);

    useEffect(() => {
      console.log(userFavorites)
      if (userFavorites) {
        setFavorite(true)
        setDefaultFavorite(1)
      } else {
        setFavorite(false)
        setDefaultFavorite(0)
      }
    }, [userFavorites])

    const handleFavorite = () => {
      const variables = {variables:{username: username, movie: title}}
      console.log(isFavorite)
      if (isFavorite) {
        console.log("REMOVING")
        setFavorite(false)    
        setDefaultFavorite(0)  
        removeFavoriteAPI(variables)
      } else {
        console.log("ADDING")
        setFavorite(true)
        setDefaultFavorite(1)
        setFavoriteAPI(variables)
      }
    }
    const handleClick = () => {
      updateMovieTitle(title)
      console.log(movieTitle)
    }

    return(
    <div className='moviecard'>

    <Card sx={{ 
    maxWidth: 290,
    maxHeight: 'auto',
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)"
      },
    heading: {
        fontWeight: "bold"
    }
    }}>

  <CardMedia
    component="img"
    height="280"
    image={img}
    title="Movie poster"
    sx={{
        height: 450,
        width: 290,
        }}/>

  <CardContent
  sx={{
    background: '#707070'
    }}>

    <Typography 
        gutterBottom variant="h5" 
        component="div" 
        color="#BFAE48"
        sx={{
            textShadow: '0 0 1.6px black, 0 0 1.6px black, 0 0 1.6px black, 0 0 1.6px black',
            height: 90,
        }}
    >
    {title}
    
    </Typography>

    <Typography 
        variant="body2" 
        color="text.primary">
      IMDb score: {rating} / 10
    </Typography>

  </CardContent>
  <CardActions
    className='cardActions'
    sx={{
        display: 'flex',
        justify: "space-between",
        background: '#707070',
        }}>
    <Link to={'/Movie_page'} style={{textDecoration: 'none'}}>
    <Button onClick = {handleClick}
        sx= {{
            backgroundColor: "#3D3D3D",
            color:"#BFAE48",
            textTransform: 'none',

            '&:hover': {
                backgroundColor: '#1F1F1F',
                boxShadow: 'none',
              },
        }}
        size="small"
        > 
        See more </Button> </Link>

        {isLoggedIn ? 
        <StyledRating
          name="customized-color"
          value={defaultFavorite}
          size='large'
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          max={1}
          onChange={handleFavorite}
          sx={{
            marginLeft: 21,
          }}
        /> : null}

  </CardActions>
  
</Card>

</div>

)};