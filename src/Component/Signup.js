import React, { useRef, useState } from 'react'
import userImg from '../assets/user-img.svg'
import {useAuth} from '../Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value)
          history.push("/login")
        } catch {
          setError("Failed to create an account")
        }
    
        setLoading(false)
      }

    return (
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src={userImg} alt="user-img" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="mb-4">
                                    <h3>Sign Up</h3>
                                </div>
                                
                                {error && <Alert variant="danger">{error}</Alert>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group" id="email">
                                        <label>Email</label>
                                        <input type="email" className="form-control" ref={emailRef} required />
                                    </div>
                                    <div className="form-group" id="password">
                                        <label>Password</label>
                                        <input type="password" className="form-control" ref={passwordRef} required />
                                    </div>
                                    <div className="form-group" id="password-confirm">
                                        <label>Password confirmation</label>
                                        <input type="password" className="form-control" ref={passwordConfirmRef} required />
                                    </div>
                                    <div className="mt-4 mb-2">
                                        <button disabled={loading} type="submit" className="btn">Sign Up</button> 
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="text">Already have an account? <Link to="/login" className="link-text">Log In</Link></span>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

