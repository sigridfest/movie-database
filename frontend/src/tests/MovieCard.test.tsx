import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MovieCard } from "../components/moviecard/MovieCard";
import { MockedProvider } from '@apollo/react-testing';
import { gql } from '@apollo/client';

const movieObject = {
    title: "TestMovie",
    img: "https://i-viaplay-com.akamaized.net/viaplay-prod/993/800/1613762117-f07774c22a81b35740522f9e1b18e1e03331bc19.jpg?width=400&height=600",
    rating: 10,
}

beforeEach(() => {
    const GET_ALL_MOVIES_FOR_CARD = gql`
    query GetAllMoviesForCard($limit: Int!, $offset: Int!){
      movies(options: {limit: $limit, offset: $offset}) {
        title
        rating
        img
      }
    }
  `
  const mocks = [
    {
      request: {
        query: GET_ALL_MOVIES_FOR_CARD,
      },
      result: {
        data: {
          movie: { id: '1', title: 'Hello', rating: 10, img: "https://i-viaplay-com.akamaized.net/viaplay-prod/993/800/1613762117-f07774c22a81b35740522f9e1b18e1e03331bc19.jpg?width=400&height=600" },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
        <MovieCard movie={movieObject}/>
     </MockedProvider>
     
    )});
    

 afterEach(() => {
    cleanup(); 
});

test('Testing if the button on the card renders', () => {
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("See more");
});

test('Testing if the image on the card renders', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
});

test('Testing that the props is passed correctly', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://i-viaplay-com.akamaized.net/viaplay-prod/993/800/1613762117-f07774c22a81b35740522f9e1b18e1e03331bc19.jpg?width=400&height=600')
    const title = screen.getByText("TestMovie");
    expect(title).toBeInTheDocument();
    const rating = screen.getByText("IMDb score: 10 / 10")
    expect(rating).toBeInTheDocument();
});

test('Testing that the button sends the user to the right page', () => {
    const button = screen.getByRole('link');
    userEvent.click(button);
    expect(button).toHaveAttribute('href', '/Movie_page/TestMovie');
}); 



