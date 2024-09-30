import { gql, useQuery, useMutation } from "@apollo/client";

export function CreateUser(): any {
    const CREATE_USER = gql
          `mutation CreateUsers($username: String!, $password: String!) {
            createUsers(input: {
              username: $username
              password: $password
            }) {
              users {
                username
              }
            }
          }`

    const [result, executeMutation] = useMutation(CREATE_USER);
    return [result, executeMutation]
}

export function AddUserFavorite(): any {
  const CONNECT_USER_TO_MOVIE = gql`
    mutation UpdateUsers($username: String!, $movie: String!) {
      updateUsers(where: {username: $username}, 
      connect: {favorites: {
        where: {node: {title: $movie}}
      }}
      ) {
        users {
          favorites {
            title
          }
        }
      }
    }` 
  const [result, executeMutation] = useMutation(CONNECT_USER_TO_MOVIE);
  return [result, executeMutation]
}

export function RemoveUserFavorite(): any {
  const DISCONNECT_USER_FROM_MOVIE = gql`
    mutation UpdateUsers($username: String!, $movie: String!) {
      updateUsers(where: {username: $username}, 
      disconnect: {favorites: {
        where: {node: {title: $movie}}
      }}
      ) {
        users {
          favorites {
            title
          }
        }
      }
    }`
    const [result, executeMutation] = useMutation(DISCONNECT_USER_FROM_MOVIE);
    return [result, executeMutation]
}

export default function CheckValidUser(Username: string, password: string): boolean {
    console.log("Does this work at all?")
    console.log("Username: " + Username);
    console.log("Password: " + password)
    const RETRIEVE_USER_INFO = gql
        `query GetUser($username: String!, $password: String!) {
            users(where: {username: $username, AND: {password: $password}}) {
              username
            }
          }`
    const { error, loading, data } = useQuery(
      RETRIEVE_USER_INFO, 
      {variables:{
        username: Username, 
        password: password
      }});

    console.log(data);
    if (typeof data !== 'undefined') {
      console.log(data);

      if (data.users.length != 0) {
        return true
      } else {
        return false
      }
    } else {
        return false
    }
}

export function GetUserFavorites(Username: String): any {
  const GET_USER_FAVORITES = gql`
    query GetUserFavorites ($username: String!){
      users (where: {username: $username}) {
        favorites {
          title
          rating
          img
        }
      }
    }`

  const { error, loading, data } = useQuery(
    GET_USER_FAVORITES, 
    {variables:{
      username: Username,
    }});
  if (typeof data !== 'undefined') {
    if (data.users.length != 0) {
      // Process the retrieved data into a object with a associated movies array
      const value = data.users.at(0).favorites
      return ({movies: value})
    } else {
      return []
    }
  } else {
      return []
  }
}

export function CheckUserFavorites(Username: String, Movie: String): any {
  const GET_USER_FAVORITES = gql`
    query GetUserFavorites ($username: String!){
      users (where: {username: $username}) {
        favorites {
          title
          rating
          img
        }
      }
    }`

  const { error, loading, data } = useQuery(
    GET_USER_FAVORITES, 
    {variables:{
      username: Username,
    }});
    if (typeof data?.users?.at(0)?.favorites !== 'undefined') {
      const AllFavorites = data.users.at(0).favorites
      for (let i = 0; i < AllFavorites.length; i++) {
        if (AllFavorites.at(0).title == Movie) {
          return true
        }
      }
    }
  return false
}