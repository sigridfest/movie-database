# Øving 3

The project is a movie database with functionality for filtration, search, sorting and favorites. 

## Content and functionality

The navigation bar is always present at the top of the page, on all the pages of the website. This way the user always has some familiar element on the page, and can always get back to the main page by clicking the logo on the top left side. This leads to a more uniform design of the webpage, and helps make the website more accessible to a variety of users. The navigation bar has a button for filtering on genres, that when clicked opens up bar with different genres to filter on right under the navigation bar. This way filtration is easily accessible to the user, very recognizeable yet in a different color than the logo so as to differentiate them. As well as this the navigation bar contains a input-field for searching the movie-database by movie-titles. To the very right of the navigation bar is a button for logging in. If the user is already logged in the username will be displayed here.

The main page, or the landing page, is a display of all the movies that currently exists in the database. The maximum number of cards or movies displayed at one time is eight, as to not make the user have to scroll too far. To view more movies pagination is used so that the used can view the eight next movies and so on. On the top of the page, below the navigation bar, there is a switch-button to toggle the sorting of the movies.

The movies are displayed as cards, with the movie-poster, the title of the movie, the imbd-score of the movie as well as two buttons, one for navigating to another page with more information about that movie and one heart-shaped button used for favoriting the movie. The button is a darker shade of grey with yellow font to increase the contrast and make it easier for the user to read. The favorite-button is shaped like a heart. This should be a familiar shape to most if not all users, as it is regularly used on different mainstream webpages and apps to signal a similar function.

For the overall design of the webpage we decided to use grey themes with the font mainly being a shade of yellow. As mentioned before this should give ample contrast and should be relatively easily to tell apart from the background. The whole page should be accessible by keyboard by pressing tab to navigate the different buttons and enter to press buttons.


## Technology

The project uses a Neo4j database. For the backend we have a GraphQL server made with Apollo. The frontend is React Typescript. Material UI is used to design the React components. As an alternative to context API, we have used Zustand as a global state management storage to pass various necessary states between components.

## Testing

### Front-end
For the front end we have two test-suites. One for the Sidebar-component and one for the MovieCard-component. For the sidebar there are some simple UI-tests to check if the sidebar component renders, if the drawer shows up on the screen when the button is clicked and another test to see if a checkbox exists in the sidebar. The sidebar-component ended up not being used in the final version of the website, but we decided to keep the component and the test as an example and if anyone ever wants to continue working on the project. 

The MovieCard component is tested with a mock movie-object, and MockedProvider is used to be able to render the component properly. The tests check that the component renders, that the props are passed properly and the button is checked to see if it takes the user to the right page.

### Back-end
For the back end we have some integration testing of the server, but as Neo4jGraphQL does a lot of work for us, there is not much testing required to ensure proper functionality.

Ideally we would like to test function against a separate but equally configured pre-production database, as testing should not be performed against production databases. However with Neo4j community edition not allowing for multiple databases we decided against testing against the actual database server.

The integration tests are representative for the queries sent and recieved, only stability toward the IDI server where the DB is deployed would be tested by more extensive testing. Due to the limited gain of http testing we decided are of the opinion that the integration tests performed are sufficient to catch any bugs with server interaction.


## Sustainable web development

One sustainable aspect of the project is the use of GraphQL to fetch data from the database into the frontend. The use of GraphQL allows for more sustainable web development than standard API calls. This is because it allows the application to access only the specific objects and fields it needs. It does not fetch an entire api endpoint, and in that way avoids having an excess of data. For example using pagination, as we do in the landing page, avoids overloading the application with all the movies in the database at once. This should ideally be implemented in the genre filtration page and search page as well, but we had to leave it due to lack of time. There is however some restraints on the data fetches in the filtration functionality. 

Sustainable development revolves a lot around minimizing the size of web pages. This can be done by for example using fewer images or compressing images. We use a lot of images in our application, and they could probably be compressed more than they are. Altering this could help our application be more environmentally friendly. 
