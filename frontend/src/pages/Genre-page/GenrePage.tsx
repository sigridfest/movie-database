import "./GenrePage.css"
import Navbar from "../../components/navbar/Navbar";
import { MovieCard } from "../../components/moviecard/MovieCard";
import { gql, useQuery } from '@apollo/client';
import { Key, useState } from 'react';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";

//GraphQL query for genre filtration
const GET_BY_GENRE = gql`
query Movies($where: MovieWhere) {
  movies(where: $where) {
    title
    rating 
    img
  }
}`
  

function GenrePage(): JSX.Element {

    /**Filtering config */
    const [genreFilter, setGenreFilter] = useState("Sci-Fi");

    const handleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const target = event.target as HTMLInputElement;
      setGenreFilter(target.value);
    }

    /**Fetching data from queries */
    const { error, loading, data } = useQuery(GET_BY_GENRE, {variables: {where: {genres_SOME: {name: genreFilter}}}});
    if (loading) return <h6>Loading...</h6>;
    if (error) return <h6>${error.message}</h6>;

    return (
 
      <div className="App">
    
        <div className='navbarContainer'>
          <Navbar/>
        </div>

        <div>
            <ToggleButtonGroup
                color="primary"
                value={genreFilter}
                exclusive
                onChange={handleChange}
                aria-label="Genre"
                >
                <ToggleButton value="Crime">Crime</ToggleButton>
                <ToggleButton value="Sci-Fi">Sci-fi</ToggleButton>
                <ToggleButton value="Action">Action</ToggleButton>
                <ToggleButton value="Thriller">Thriller</ToggleButton>
                <ToggleButton value="Documentary">Documentary</ToggleButton>
                <ToggleButton value="War">War</ToggleButton>
                <ToggleButton value="Horror">Horror</ToggleButton>
                <ToggleButton value="Music">Music</ToggleButton>
                <ToggleButton value="Animation">Animation</ToggleButton>
                <ToggleButton value="Comedy">Comedy</ToggleButton>
                <ToggleButton value="Adventure">Adventure</ToggleButton>
                <ToggleButton value="Fantasy">Fantasy</ToggleButton>
            </ToggleButtonGroup>
        </div>

        <div className='cardContainer'>
          {data?.movies?.map((movie: { id: Key | null | undefined; }) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      </div>
    
    );
}

export default GenrePage;