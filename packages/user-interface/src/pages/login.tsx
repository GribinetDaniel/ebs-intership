import React, {useState, useContext} from "react";
import './styles/auth.css'
import { mainAxios } from "../utils/mainAxios";
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from "../context/myContext";

function Login(){
    
    const navigate = useNavigate();
    const {isAuth, setIsAuth, user, setUser} = useContext(UserContext)
    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    })


    const handleInput = (event: any) => {
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }

    async function handleSubmit (event: any){
        event.preventDefault();
        
        mainAxios.post('/auth/login', newUser)
        .then(response => {
            localStorage.setItem("token", response.data.token)
        })
        .then(() => {
            mainAxios.get('/account', {headers: {
                Authorization: localStorage.getItem("token")
            }})
            .then(response => setUser(response.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        setIsAuth(true)
        navigate('/');
        
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" onChange={handleInput} id="username" name="username" placeholder="Enter your username"/>
                <label htmlFor="password">Password:</label>
                <input type="password" onChange={handleInput} id="password" name="password" placeholder="Enter your password"/>
                <span>Don't have an account</span>
                <Link to = '/register'>Sign up</Link>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default Login;