import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginField.css'
import  useUserStore from "../../store";
import CheckValidUser from "../../api/UserQuery"
import StyledButton from "../styledbutton/StyledButton";

export default function LoginField() {
    //Navigation for login and new-user buttons
    const Navigate = useNavigate();
    const goToUserPage = () => {
        Navigate('/UserPage');}
    const goToNewUserPage = () => {
        Navigate('/NewUserPage');}
    


// Button-components for login and new-user
const StyleButton = StyledButton;

//TODO:
// Make listener for inputs. Add to context.
// Listeners for user/password inputs:
const [username, setUsername] = React.useState<string>("");
const [password1, setPassword1] = React.useState<string>("");
const [userinfo, setUserinfo] = React.useState<string[]>([]);
const [user, updateUser] = useUserStore((state)=>[state.user, state.updateUser]);
const [password, updatePassword] = useUserStore((state)=>[state.user,state.updatePassword]);
const [loggedIn, updateLogIn] = useUserStore((state) =>[state.loggedIn, state.updateLogIn]);
// Validation of user details
const checkValid = CheckValidUser(username, password1)
const [isValid, setIsValid] = useState(false);
// Boolean to hide or show error text
const [hasLoginError, setLoginError ] = useState(0) 

const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);}

const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(event.target.value);}


    
const handleLogin = () =>{
   
    // Check if valid login
    if (checkValid) {
        console.log(userinfo);
        setUserinfo([username, password1]);
        {goToUserPage()}
        updateUser(username);
        updatePassword(password1);
        updateLogIn(loggedIn);
    } else {
        // Display login error text
        setLoginError(1)
    }
}
    

    return(
        <div className="App">
            <div className="loginField">
                <h1 className="userTitles">Login</h1>
                <TextField className="textField" label="Username" variant="standard" onChange = {handleUsername}/>
                            <br/>
                            <TextField label="Password" variant="standard" onChange = {handlePassword}/>
                            <br/>
                {hasLoginError ? <p id="LoginErrorText" style={{color: "red"}}>INVALID LOGIN DETAILS</p> : null}
                <div className="buttons">
                <StyleButton
                size="small"
                variant = "contained" 
                onClick={handleLogin}> Login </StyleButton>
                </div>
                
                <StyleButton size="small" variant = "contained" onClick={goToNewUserPage}>New User?</StyleButton>
            </div>
        </div>
    )
}
