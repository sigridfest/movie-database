import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../store';

function Navbar(){

    const navigate = useNavigate();

    const [movieTitle, updateMovieTitle]= useUserStore((state)=>[state.movieTitle, state.updateMovieTitle]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if(searchWord == ''){
            navigate('/');
        }
        else{
            navigate('/SearchPage');
            updateMovieTitle(searchWord);
        }

    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchWord(event.target.value);

    }

    const [searchWord, setSearchWord] = useState('');

    const showUser = useUserStore((state: { user: any; })=> state.user);
    const isLoggedIn = useUserStore((state: { loggedIn: any; })=> state.loggedIn);
    const notLoggedIn = "Log in";
    
    return (

        <React.Fragment>

            <AppBar sx={{
                background: "#707070",

                }}>  

                <Toolbar sx={{ justifyContent: "space-between"}}>

                <Link to="/" className="title">
                    krdb
                </Link>

                <Link to="/GenrePage" className="GenreLink">
                    Genres
                </Link>

                    <TextField label="Title search" variant="standard"  onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={e => handleClick(e)}>
                                <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                            )
                        }}/>
              
                        <Link to={isLoggedIn ? ("/UserPage") : ("/LoginPage")} style={{textDecoration: 'none'}}>
                        <IconButton disableRipple>
                            <div className="username"> {isLoggedIn ? (showUser) : (notLoggedIn)}</div>
                            <AccountCircleIcon sx={{fontSize: "2rem"}}/>
                        </IconButton>
                        </Link>

                </Toolbar>

            </AppBar>

        </React.Fragment>
    )}

export default Navbar;