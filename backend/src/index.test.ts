import { gql, ApolloServer } from "apollo-server";

const typeDefs = gql`
    type Movie {
        title: String
        year: Int
        rating: Float
    }

    type Query {
        movies(title: String): [Movie]
  }
`;

// Defining testServer content
const DBmovies = [{ 
    title: "Morbius", 
    year: 2022, 
    rating: 5.2
}, {
    title: "The Godfather",
    year: 1972,
    rating: 9.2
}]
const resolvers =  {
    Query: {
        movies: (parent, {title}) => (title ? DBmovies.filter(t => t.title === title): title)
    },
};

// Available for all tests
let testServer: ApolloServer
describe("Integration testing of ApolloServer", () => {
    // Define new testServer 
    beforeAll(() => {
        // Create test server
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        testServer = server
    })

    // Stop testServer when done
    afterAll(() => {
        testServer.stop()
    })

    // Based on 
    // https://medium.com/@jdeflaux/graphql-integration-tests-with-apollo-server-testing-jest-mongodb-and-nock-af5a82e95954
    test("Retrieve movies, check only intended movies in response", async () => {
        // Generate query
        const GET_MOVIES = `
        {
            movies(title: "Morbius") {
                title
                year
                rating
            }
        }`
        // Attempt to run query
        const res = await testServer.executeOperation({ 
            query: GET_MOVIES
        })
        const retrievedQuery = res.data.movies
        // Test values retrieved and check if correct values found
        // Should find Morbius in the array
        expect(retrievedQuery).toEqual(expect.arrayContaining([{ title: "Morbius", year: 2022, rating: 5.2}]))
        // Should NOT find Shrek (Not in DB) or The Godfather (In DB, not in query)
        expect(retrievedQuery).not.toEqual(expect.arrayContaining([{ title: "Shrek", year: 2001, rating: 7.9 }]))
        expect(retrievedQuery).not.toEqual(expect.arrayContaining([{ title: "The Godfather", year: 1972, rating: 9.2 }]))
    })
        
    test("Only retrieve 2 out of 3 fields", async () => {
        // Generate query
        const GET_MOVIES = `
        {
            movies(title: "Morbius") {
                title
                rating
            }
        }`
        // Attempt to run query
        const res = await testServer.executeOperation({ 
            query: GET_MOVIES
        })
        const retrievedQuery = res.data.movies[0]
        // Test values retrieved and check if correct values found
        // Should find Morbius but no year field
        expect(retrievedQuery).toHaveProperty("title", "Morbius")
        expect(retrievedQuery).toHaveProperty("rating", 5.2)
        expect(retrievedQuery).not.toHaveProperty("year", 2022)
        testServer.stop()
    })
})