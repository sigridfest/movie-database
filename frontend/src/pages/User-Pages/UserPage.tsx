import { Key, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import '../../components/loginfield/LoginField.css'
import { MovieCard } from '../../components/moviecard/MovieCard';
import "./UserPage.css"
import useUserStore from '../../store'
import StyledButton from '../../components/styledbutton/StyledButton'
import { GetUserFavorites } from '../../api/UserQuery';
import { useNavigate } from 'react-router-dom';

// GraphQL query for card info for all movies. To be replaced with favorites for user
/*
const GET_ALL_MOVIES_FOR_CARD = gql`
query GetAllMoviesForCard($limit: Int!, $offset: Int!){
  movies(options: {limit: $limit, offset: $offset}) {
    title
    rating
    img
  }
}
` */
// Limit # of favorite moviecards per page
const PAGE_SIZE = 5;

  // Styled button for show password
  const StyleButton = StyledButton


 
export default function UserPage(){
  // zustand state storage for user info
  const username = useUserStore(state => state.user)
  const password = useUserStore(state=> state.password)
  const favoritesData = GetUserFavorites(username)
  let showFavorites = 0
 // navigation for logout button
  const Navigate = useNavigate();
  const goToMainPage = () => {
      Navigate('/');}

  // Query for all movies currently. To be replaced with favorites query
  const[page, setPage] = useState(0);
  // const { error, loading, data } = useQuery(GET_ALL_MOVIES_FOR_CARD, {variables:{limit: PAGE_SIZE, offset: page * PAGE_SIZE}});

  // Set visibility of favorited movies section
  if (typeof favoritesData.movies == 'undefined') {
    showFavorites = 0
  } else if (favoritesData.movies.length < 1) {
    showFavorites = 0
  } else {
    showFavorites = 1
  }

  //Show/hide password
  const [showPassword, setShowPassword] = useState(true);
  const [btnText, setBtnText] = useState("Show password");
  const handleClick = () => {setShowPassword(current => !current);
    setBtnText(current => current === "Show password" ? "Hide password" : "Show password");
  }

  //Log out by refreshing session storage
  const handleLogout = () => {
    goToMainPage();
    sessionStorage.clear();
    window.location.reload();
  }

  return(
    <div className="App">
      <Navbar/>
      <br/>
      <h3>User Information</h3>
        <div className="userContainer">
            <h4 className = "userName">Username: </h4>
            <p className = "userNameP">{username}</p>
            <h4 className = "password">Password: </h4>
            {/* Hides password until button is toggled */}
            <p className ={showPassword ?  "passwordHide" : "passwordShow"}>
                {password}
            </p>
        </div>
        <div className = "buttons">
          <StyleButton size = "small" variant = "contained" className = "showPassword" onClick={handleClick}>{btnText}
          </StyleButton>
        </div>
          <StyleButton size = "small" variant = "contained" onClick = {handleLogout} >Log out
          </StyleButton>
        
        <h4 className = "favorites">Favorite movies:</h4>
        {/* Pull in favorites from DB, map into moviecards.*/}
        {showFavorites ? 
          <div className="cardUserContainer">
          {favoritesData?.movies?.map((movie: { id: Key | null | undefined; }) => (
          <MovieCard key={movie.id} movie={movie} />
          ))}
          </div>
          : <div>You have not chosen any favorites, yet!</div> }

    </div>
  )
}