import react, {useEffect, useState} from "react"
import { MakeNewMovieEntry, CheckIfMovieExists } from "../api/MovieQuery"


function AdminPage() : JSX.Element {
    const [imdbID, setImdbID] = useState<string>()
    const [scraperData, setScraperData] = useState<any>()
    const [movieTitle, setmovieTitle] = useState<string>("None")
    const [year, setYear] = useState<number>()
    const [rating, setRating] = useState<number>()
    const [plot, setPlot] = useState<string>()
    const [img, setImg] = useState<string>()
    const [actor1, setActor1] = useState<string>()
    const [actor2, setActor2] = useState<string>()
    const [actor3, setActor3] = useState<string>()
    const [genreNumber, setGenreNumber] = useState<number>()
    const [genre1, setGenre1] = useState<string>();
    const [genre2, setGenre2] = useState<string>();
    const [genre3, setGenre3] = useState<string>();
    const movieExistsInDB = CheckIfMovieExists(movieTitle);
    const [movieExecutor, setMutationExecutor] = MakeNewMovieEntry();

    const handleChange = (event: any) => {
        setImdbID(event.target.value)
    }

    useEffect(() => {
        if (typeof scraperData !== 'undefined') {
            console.log(scraperData)
            setGenreNumber(scraperData['genre'].length)
            setmovieTitle(scraperData['title'])
            setYear(Number(scraperData['year']))
            setRating(Number(scraperData['rating']['star']))
            setImg(scraperData['image'])
            setActor1(scraperData['actors'][0])
            setActor2(scraperData['actors'][1])
            setActor3(scraperData['actors'][2])
            if (genreNumber == 3) {
                setGenre1(scraperData['genre'][0])
                setGenre2(scraperData['genre'][1])
                setGenre3(scraperData['genre'][2])
            } else if (genreNumber == 2) {
                setGenre1(scraperData['genre'][0])
                setGenre2(scraperData['genre'][1])
            } else if (genreNumber == 1) {
                setGenre1(scraperData['genre'][0])
            }
            setPlot(scraperData['plot'])
        }
    }, [scraperData])

    const getMovieInfo = () => {
        const retrieveURL = "https://imdb-api.tprojects.workers.dev/title/" + imdbID
        window.fetch(retrieveURL)
            .then((res) => res.json())
            .then((res) => setScraperData(res))
            .catch((res) => console.log(res))
    }

    const submitData = () => {
        console.log(movieTitle)
        console.log(movieExistsInDB)
        if (movieExistsInDB) {
            console.log("ALREADY EXISTS IN DB")
            return 
        } else {
            console.log(genreNumber)
            let variables = {variables: {}}
            if (genreNumber == 3) {
                variables = {variables:{
                    "input": [{
                        "title": movieTitle,
                        "year": year,
                        "rating": rating,
                        "plot": plot,
                        "img": img,
                        "actors": {
                        "connectOrCreate": [{
                            "where": {"node": {"name": actor1}},
                            "onCreate": {"node": {"name": actor1}}
                            },{
                            "where": {"node": {"name": actor2}},
                            "onCreate": {"node": {"name": actor2}}
                            },
                            {
                            "where": {"node": {"name": actor3}},
                            "onCreate": {"node": {"name": actor3}}
                            }
                        ]},
                        "genres": {"connectOrCreate": [
                            {
                            "where": {"node": {"name": genre1}},
                            "onCreate": {"node": {"name": genre1}}
                            },
                            {
                            "where": {"node": {"name": genre2}},
                            "onCreate": {"node": {"name": genre2}}
                            },
                            {
                            "where": {"node": {"name": genre3}},
                            "onCreate": {"node": {"name": genre3}}
                            }
                        ]}
                    }
                    ]}
                }
            } else if (genreNumber == 2) {
                variables = {variables:{
                    "input": [{
                        "title": movieTitle,
                        "year": year,
                        "rating": rating,
                        "plot": plot,
                        "img": img,
                        "actors": {
                        "connectOrCreate": [{
                            "where": {"node": {"name": actor1}},
                            "onCreate": {"node": {"name": actor1}}
                            },{
                            "where": {"node": {"name": actor2}},
                            "onCreate": {"node": {"name": actor2}}
                            },
                            {
                            "where": {"node": {"name": actor3}},
                            "onCreate": {"node": {"name": actor3}}
                            }
                        ]},
                        "genres": {"connectOrCreate": [
                            {
                            "where": {"node": {"name": genre1}},
                            "onCreate": {"node": {"name": genre1}}
                            },
                            {
                            "where": {"node": {"name": genre2}},
                            "onCreate": {"node": {"name": genre2}}
                            }
                        ]}
                    }
                    ]}
                }
            } else {
                variables = {variables:{
                    "input": [{
                        "title": movieTitle,
                        "year": year,
                        "rating": rating,
                        "plot": plot,
                        "img": img,
                        "actors": {
                        "connectOrCreate": [{
                            "where": {"node": {"name": actor1}},
                            "onCreate": {"node": {"name": actor1}}
                            },{
                            "where": {"node": {"name": actor2}},
                            "onCreate": {"node": {"name": actor2}}
                            },
                            {
                            "where": {"node": {"name": actor3}},
                            "onCreate": {"node": {"name": actor3}}
                            }
                        ]},
                        "genres": {"connectOrCreate": [
                            {
                            "where": {"node": {"name": genre1}},
                            "onCreate": {"node": {"name": genre1}}
                            },
                        ]}
                    }
                    ]}
                }
            }
            movieExecutor(variables)
            console.log("MOVIE SUBMITTED TO DB")
        }
    }

    return (
        <div>
        <div>
            <a> HERE</a>
            <input type="text" name="imdbID" onChange={handleChange} placeholder="tt0413267"/> {/*tt0413267*/}
            <button onClick={() => getMovieInfo()}>BUTTON</button>
            <img id="MoviePoster"></img>
        </div>
        <div>
            <form>
                <div>
                <input type="text" id="title" placeholder="Movie Title" required value={movieTitle}/>
                <input type="text" id="rating" placeholder="Movie Rating" required value={rating}/>
                <input type="text" id="year" placeholder="Movie release year" value={year}/>
                <br/>
                <input type="text" id="actor1" placeholder="Actor 1" value={actor1}/>
                <input type="text" id="actor2" placeholder="Actor 2" value={actor2}/>
                <input type="text" id="actor3" placeholder="Actor 3" value={actor3}/>
                <br/>
                <input type="text" id="genre1" placeholder="Genre1" value={genre1}/>
                <input type="text" id="genre2" placeholder="Genre1" value={genre2}/>
                <input type="text" id="genre3" placeholder="Genre1" value={genre3}/>
                <br/>
                <input id="plot" placeholder="Plot of movie" style={{ width: "300px" }} value={plot}/>
                <div id="posterImage" ><img src={img} style={{ height: "500px" }}></img></div>
                </div>
            </form>
        </div>
        <div>
            <button onClick={submitData}>Submit data to DB</button>
        </div>
        </div>
    )
}

export default AdminPage