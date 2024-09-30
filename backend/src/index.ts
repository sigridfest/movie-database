import { gql, ApolloServer } from "apollo-server";
import { Neo4jGraphQL } from "@neo4j/graphql";
import  neo4j from "neo4j-driver";
import 'dotenv/config'

const typeDefs = gql`

  type Movie {
    title: String! @unique
    year: Int
    rating: Float
    plot: String
    img: String
    actors: [Person!]! @relationship(type: "ACTED_IN", direction: IN)
    genres: [Genre!]! @relationship(type: "IN_GENRE", direction: OUT)
  }

  type Person {
    name: String! @unique
    movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
  }

  type Genre {
    name: String! @unique
    movies: [Movie!]! @relationship(type: "CONTAINED_IN_GENRE", direction: IN)
  }

  type User {
    username: String! @unique
    password: String!
    favorites: [Movie!]! @relationship(type: "FAVORITED", direction: OUT)
  }
`;


const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema: schema
    });

    server.listen().then(({ url }) => {
        console.log(`GraphQL server ready on ${url}`);
    });
});
