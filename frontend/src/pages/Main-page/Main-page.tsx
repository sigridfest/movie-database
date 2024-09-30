import "./Main-page.css"
import Navbar from "../../components/navbar/Navbar";
import { MovieCard } from "../../components/moviecard/MovieCard";
import { gql, useQuery } from '@apollo/client';
import { Key, useState } from 'react';
import Switch from '@mui/material/Switch/Switch';

// GraphQL query for paginated movies sorted by rating highest - lowest
  const SORTED_BY_RATING = gql`
      query Movies($limit: Int!, $offset: Int!){
        movies(options: {limit: $limit, offset: $offset, sort: {rating:DESC} }) {
          title
          rating
          img
        }
      }`

// GraphQL query for paginated movies sorted by years newes - oldest
    const SORTED_BY_YEARS = gql`
    query Movies($limit: Int!, $offset: Int!){
      movies(options: {limit: $limit, offset: $offset, sort: {year:DESC} }) {
        title
        rating
        img
      }
    }`
  

function Main_page(): JSX.Element {

    /**Pagination conifg */
    const[page, setPage] = useState(0);
    const PAGE_SIZE = 8;

    /**Sorting config */
    const [query, setQuery]= useState(SORTED_BY_RATING);
    const [toggleValue, setToggleValue] = useState(true); //false=shows by rating. true=shows by year
    const toggler = () => {
      toggleValue ? setToggleValue(false): setToggleValue(true);
      if(toggleValue) {setQuery(SORTED_BY_YEARS);}
      else{setQuery(SORTED_BY_RATING);}
    }

    /**Fetching data from queries */
    const { error, loading, data } = useQuery(query, {variables:{limit: PAGE_SIZE, offset: page * PAGE_SIZE}});
    if (loading) return <h6>Loading...</h6>;
    if (error) return <h6>${error.message}</h6>;

    return (
 
      <div className="App">
    
        <div className='navbarContainer'>
          <Navbar/>
        </div>

        <div className='toggleContainer'>
          <Switch onClick={toggler}></Switch>
          {toggleValue ? <span>Highest to lowest rated</span> : <span>Newest to oldest</span>}
        </div>

     
        <div className='cardContainer'>
          {data?.movies?.map((movie: { id: Key | null | undefined; }) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <nav>
          {page != 0 && <button className='pageButton' onClick={() => setPage((prev) => prev-1)}> Back </button>}

          <span className="page"> Page {page + 1} </span>
          
          <button className='pageButton' onClick={() => setPage((prev) => prev + 1)}> Next </button>
        </nav>

      </div>
    
    );
}

export default Main_page;
