import React, { useRef, useState } from 'react'
import userImg from '../assets/user-img.svg'
import {useAuth} from '../Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const {reset} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setMessage("")  
          setError("")
          setLoading(true)
          await reset(emailRef.current.value)
          setMessage('Check your inbox for further instruction')
        } catch {
          setError("Failed to reset password")
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
                                    <h3>Reset Account</h3>
                                </div>
                                
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group" id="email">
                                        <label>Email</label>
                                        <input type="email" className="form-control" ref={emailRef} required />
                                    </div>
                                    <div className="mt-4 mb-2">
                                        <button disabled={loading} type="submit" className="btn">Reset Password</button> 
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Link to="/login" className="border-btn mt-2 mb-2">Log In</Link>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="text">Don't have an account? <Link to="/signup" className="link-text">Sign up</Link></span>
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

