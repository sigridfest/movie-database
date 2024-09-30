# Backend server

## Apollo

This backend server is powered by Apollo, which it very simple to connect to graphQL and a neo4j database using the [Neo4jGraphQL](https://neo4j.com/docs/graphql-manual/current/) package.

The server simply defined the valid fields for each type of node in the neo4j database, then provides a `driver` that allowed the tool to connect to the database. Resolvers and schemes are then defined automatically.

## GraphQL

The API that connects the backend to the frontend is [graphQL](https://graphql.org/), which allows the frontend to specify filtering, sorting, and amount of data to retrieve.
Compared to REST API's this approach is quick and reduces both network load and frontend processing requirements.

## Neo4j

The database used in this project is [neo4j](https://neo4j.com/), which is a database that stores information in a directed graph of nodes. Neo4j is highly efficient for large datasets, making it beneficial for data storage pages, like our frontend.

Neo4j is either paid or free. The free community edition allows you to still perform the basic functionality but restricts you from QoL features like multiple databases etc.In this project all data is stored within a single database, as we use the communiy edition.

_Important note_: Passwords are not stored securely on this server implementation, any passwords submitted should be simple throw-away passwords in order to protect your own safety.

## Testing

There is some integration testing of the server in the `src/index.test.ts` file, running through [Jest](https://jestjs.io/). As Neo4jGraphQL does a lot of work for us, there is not much testing required to ensure proper functionality.

To run the test simple run the command:
First navigate to the root of the backend:

```
cd backend
```

Then run the test with the command:

```
npm test
```

Ideally we would like to test function against a separate but equally configured pre-production database, as testing should not be performed against production databases. However with Neo4j community edition not allowing for multiple databases we decided against testing against the actual database server.

The integration tests are representative for the queries sent and recieved, only stability toward the IDI server where the DB is deployed would be tested by more extensive testing. Due to the limited gain of http testing we decided are of the opinion that the integration tests performed are sufficient to catch any bugs with server interaction.
