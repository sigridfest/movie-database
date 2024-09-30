import "./SearchPage.css"
import Navbar from "../../components/navbar/Navbar";
import { MovieCard } from "../../components/moviecard/MovieCard";
import { gql, useQuery } from '@apollo/client';
import { Key, useState } from 'react';
import { useLocation } from 'react-router-dom'
import React from "react";
import useUserStore from "../../store";

//GraphQL query for search
const GET_SEARCH_RESULTS = gql`
query Movies($where: MovieWhere) {
  movies(where: $where)  {
    title
    img
    rating
  }
}`
  

function SearchPage(): JSX.Element {

    /**Search config */
    const [sw, setSW] = useState("");
    const movieTitle = useUserStore(state=>(state.movieTitle))
    const location = useLocation()

    React.useEffect(() => {
      setSW(movieTitle);
    }, )

    /**Fetching data from queries */
    const { error, loading, data } = useQuery(GET_SEARCH_RESULTS, {variables: {where: {title_CONTAINS: sw}}});
    if (loading) return <h6>Loading...</h6>;
    if (error) return <h6>${error.message}</h6>;
    console.log(data)
    console.log(movieTitle)
    
    return (
 
      <div className="App">
    
        <div className='navbarContainer'>
          <Navbar/>
        </div>

        <div className='cardContainer'>
          {data?.movies?.map((movie: { id: Key | null | undefined; }) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      </div>
    
    );
}

export default SearchPage;
