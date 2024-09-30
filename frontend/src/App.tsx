import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main_page from './pages/Main-page/Main-page';
import Movie_page from './pages/MoviePage/Movie-page';
import GenrePage from './pages/Genre-page/GenrePage';
import SearchPage from './pages/Search-page/SearchPage';
import NewUserPage from './pages/User-Pages/NewUserPage';
import LoginPage from './pages/User-Pages/LoginPage';
import UserPage from './pages/User-Pages/UserPage';
import AdminPage from './pages/AdminPage';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: " http://it2810-55.idi.ntnu.no:4000/" }),
]);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="Movie_page" element={<Movie_page />}/>
        <Route path="/" element={<Main_page />}/>
        <Route path="LoginPage" element={<LoginPage />}/>
        <Route path="NewUserPage" element={<NewUserPage />}/>
        <Route path="UserPage" element={<UserPage />}/>
        <Route path="GenrePage" element={<GenrePage />}/>
        <Route path="SearchPage" element={<SearchPage />}/>
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
