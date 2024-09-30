import { gql, useQuery, useMutation } from "@apollo/client";

export const MakeNewMovieEntry: any = () => {
    const MAKE_MOVIE_QUERY = gql`
    mutation CreateMovies($input: [MovieCreateInput!]!) {
        createMovies(input: $input) {
          movies{
            title
            rating
          }
        }
      }`
    const [result, executeMutation] = useMutation(MAKE_MOVIE_QUERY);
    return [result, executeMutation]
}

export function CheckIfMovieExists(movieName: string | undefined): boolean {
    if (typeof movieName == 'undefined') {
        movieName = "None"
    }
    const RETRIEVE_MOVIE_INFO = gql
        `query GetMovieTitle($movieName: String!) {
            movies(where: {title: $movieName}) {
              title
            }
          }`
    const { error, loading, data } = useQuery(RETRIEVE_MOVIE_INFO, {variables: {movieName: movieName}});
    if (typeof data !== 'undefined') {
      if (data.movies.length != 0) {
        return true
      } else {
        return false
      }
    } else {
        return false
    }
}