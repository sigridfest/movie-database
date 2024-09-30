import './UserPage.css';
import CreateUserField from '../../components/createuserfield/CreateUserField'
import Navbar from '../../components/navbar/Navbar'

export default function NewUserPage(){

    return(
        <div>
            <Navbar/>
            <CreateUserField/>
        </div>
    )
}