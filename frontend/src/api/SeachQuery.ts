import { gql, useQuery, useMutation } from "@apollo/client";

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

//query for søk på tittel
/*
query Movies($where: MovieWhere) {
    movies(where: $where) {
      title
      img
      rating
    }
  }

//query for sjangerfiltrering
query Movies($where: MovieWhere) {
    movies(where: $where) {
      title
      rating 
      img
    }
  }

//query for sortering - rating
    query Movies($limit: Int!, $offset: Int!){
      movies(options: {limit: $limit, offset: $offset, sort: {rating:DESC} }) {
        title
        rating
        img
      }
    }

//query for sortering - år
        query Movies($limit: Int!, $offset: Int!){
      movies(options: {limit: $limit, offset: $offset, sort: {year:DESC} }) {
        title
        rating
        img
        year
      }
    }
*/

function SearchQuery(){

}

export default SearchQuery();