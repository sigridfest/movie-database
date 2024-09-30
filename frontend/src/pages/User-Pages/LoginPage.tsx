import Navbar from '../../components/navbar/Navbar';
import "./UserPage.css"
import LoginField from '../../components/loginfield/LoginField';

interface LoginItems {
    username: string;
    password: string;
}
export default function LoginPage() {

    return (
        <div className="App">
            <Navbar/>
            <LoginField/>
        </div>
    )
}