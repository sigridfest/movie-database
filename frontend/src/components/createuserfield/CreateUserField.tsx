import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store';
import { CreateUser } from "../../api/UserQuery"
import CheckValidUser from "../../api/UserQuery"
import StyledButton from '../styledbutton/StyledButton';

interface newUserProps{
    newUsername: string;
    newPassword: string;
    newUserInfo: string[];
}

export default function CreateUserField() {

    //Navigation for the create user button
    const Navigate = useNavigate();
    const goToLoginPage = () => {
        Navigate('/LoginPage');}

    // button-component for create user
    const StyleButton = StyledButton

    // Listeners for user/password inputs:
    const [newUserName, setNewUserName] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newUserinfo, setNewUserinfo] = React.useState([{newUserName: '', newPassword: ''}]);
    const [createdUser, addCreatedUser] = useUserStore((state)=>[state.createdUser, state.addCreatedUser]);
    // States sending new user information to the DB
    const [createUserInDB, createUserExecution] = CreateUser()
    // Validation of user details
    const checkValid = CheckValidUser(newUserName, newPassword)
    // Boolean to hide or show error text
    const [hasLoginError, setLoginError ] = useState(0) 

    //Listeners for creating new account info
    const handleNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(event.target.value);
    };
    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };


    const handleCreateUser = () => {
        if (!checkValid) {
            // Define variables for graphQL query
            const variables = {variables:{username: newUserName, password: newPassword}}
            // Execute query to create user in DB
            createUserInDB(variables)

            // Local thingies
            setNewUserinfo([{newUserName, newPassword}]);
            console.log(newUserinfo);
            {goToLoginPage()}
            addCreatedUser(newUserinfo);
            // Fixes login bug, browser must refresh in order to log in to a newly created user.
            window.location.reload();
        } else {
            setLoginError(1)
        }
    };

    return (
        <div className='App'>
            <div className="createUserField">
                <h1 className = "userTitles">Create a new user</h1>
                <TextField label="Username" variant="standard" onChange = {handleNewUserNameChange}/>
                <br/>
                <TextField label="Create Password" variant="standard" onChange = {handleNewPasswordChange}/>
                <br/>
                {hasLoginError ? <p id="LoginErrorText" style={{color: "red"}}>USER ALREADY EXISTS</p> : null}
                <StyleButton size="small" variant = "contained" onClick={handleCreateUser}>
                    Create User
                </StyleButton>
        </div>
    </div>
    )
}