import { gql, useQuery } from "@apollo/client";
import Navbar from "../../components/navbar/Navbar";
import useUserStore from "../../store";
import "./Movie-page.css";

const GET_MOVIE_PAGE_INFO = gql`
query getMoviePageInfo($title: String!) {
    movies(where: {title: $title}) {
      title
      year
      rating
      plot
      img
      actors {
        name
      }
      genres {
        name
      }
    }
  }
`


function Movie_page() {

  const movieTitle = useUserStore(state => state.movieTitle)

    const { error, loading, data } = useQuery(GET_MOVIE_PAGE_INFO, {variables:{title: movieTitle}});
 
    if (loading) return <h6>Loading...</h6>;
 
    if (error) return <h6>${error.message}</h6>;

    console.log(data.movies);
    console.log(error);
 
    return (
        <div>
            <Navbar/>

            {data.movies.map((movie: any) => (
               
            <div className="gridContainer">
                <div className="content">
 
                    <div className="titleContainer">  
                    <h1> {movie.title} </h1>
                    </div>
 
                    <div className="yearContainer">  
                    <h1> {movie.year} </h1>
                    </div>
 
                    <div className="summaryContainer">
                    <p> {movie.plot}  </p>
                    </div>

                    <div className="ratingContainer">
                    <h1> {movie.rating} / 10 </h1>
                    </div>
 
                    <h4 className="sections">Actors:</h4>
                    {movie.actors.map((actor: any) => (
                    <div className="actorsContainer">  
                    <h5> {actor.name} </h5>
                    </div>
                    ))}
 
                    <h4 className="sections">Genres:</h4>
                    {movie.genres.map((genre: any) => (
                    <div className="genresContainer">  
                    <h5> {genre.name} </h5>
                    </div>
                    ))}
 
                </div>

                <div className="image">

                <img src = {movie.img} alt="Image poster" className="img"/>
                </div>
            </div> ))}
          </div>
    );
}
 
export default Movie_page;

