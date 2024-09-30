import { gql, useQuery } from "@apollo/client";

//query for søk på tittel
function GetSearchResults(searchWord: string) {
  const GET_SEARCH_RESULTS = gql`
      query Movies($where: MovieWhere) {
        movies(where: $where) {
          title
          img
          rating
        }
      }`

  const { data, loading, error } = useQuery(GET_SEARCH_RESULTS, {variables:{searchWord: searchWord}});
}

//query for sjangerfiltrering
function getByGenre(genre: string) {
  const GET_BY_GENRE = gql`
    query Movies($where: MovieWhere) {
      movies(where: $where) {
        title
        rating 
        img
      }
    }`

    const { data, loading, error } = useQuery(GET_BY_GENRE, {variables:{genre: genre}});
}

//query for sortering på rating

function sortedByRating(limit: string, offset: string){ //bør være int?? men får feilmelding
  const SORTED_BY_RATING = gql`
  query Movies($limit: Int!, $offset: Int!){
    movies(options: {limit: $limit, offset: $offset, sort: {rating:DESC} }) {
      title
      rating
      img
    }
  }`

  const { data, loading, error } = useQuery(SORTED_BY_RATING, {variables:{limit: limit, offset: offset}});
}

//query for sortering på år
function sortedByYears(limit: string, offset: string){ //bør være int?? men får feilmelding
  const SORTED_BY_YEARS = gql`
  query Movies($limit: Int!, $offset: Int!){
    movies(options: {limit: $limit, offset: $offset, sort: {year:DESC} }) {
      title
      rating
      img
    }
  }`

  const { data, loading, error } = useQuery(SORTED_BY_YEARS, {variables:{limit: limit, offset: offset}});
}

function SearchQuery() {

}

export default SearchQuery();


