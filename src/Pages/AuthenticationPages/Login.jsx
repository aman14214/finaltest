import React, { useState } from "react"
import "./UserAuth.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "../../Context/toast-context"

function Login()
{
    const { showToast } = useToast()

    const [userEmail    , setUserEmail]    = useState('')
    const [userPassword , setUserPassword] = useState('')

    const navigate = useNavigate()

    function loginUser(event)
    {
        event.preventDefault();
        axios.post(
            "https://bookztron.herokuapp.com/api/login",
            {
                userEmail,
                userPassword
            }
        )
        .then(res => {
            
            if(res.data.user)
            {
                localStorage.setItem('token',res.data.user)
                showToast("success","","Logged in successfully")
                navigate('/shop')
            }
            else
            {
                throw new Error("Error in user login")
            }

        })
        .catch(err=>{
            showToast("error","","Error logging in user. Please try again")
        })
    }

    return (
        <div className="user-auth-content-container">
            <form onSubmit={loginUser} className="user-auth-form">
                <h2>Login</h2>
                
                <div className="user-auth-input-container">
                    <label htmlFor="user-auth-input-email"><h4>Email address</h4></label>
                    <input 
                        id="user-auth-input-email" 
                        className="user-auth-form-input" 
                        type="email" 
                        placeholder="Email" 
                        value={userEmail}
                        onChange={(event)=>setUserEmail(event.target.value)}
                        required/>
                </div>

                <div className="user-auth-input-container">
                    <label htmlFor="user-auth-input-password"><h4>Password</h4></label>
                    <input 
                        id="user-auth-input-password" 
                        className="user-auth-form-input" 
                        type="password" 
                        placeholder="Password" 
                        value={userPassword}
                        onChange={(event)=>setUserPassword(event.target.value)}
                        required/>
                </div>

                <div className="user-options-container">
                    <div className="remember-me-container">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">Remember Me</label>
                    </div>
                    <div>
                        <Link to="#" className="links-with-blue-underline" id="forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <button type="submit" className="solid-success-btn form-user-auth-submit-btn">Login</button>

                <div className="new-user-container">
                    <Link to="/signup" className="links-with-blue-underline" id="new-user-link">
                        Create new account &nbsp; 
                    </Link>
                </div>

            </form>
        </div>
    )
}

export { Login }