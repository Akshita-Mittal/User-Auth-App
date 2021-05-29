import React, { useRef, useState } from 'react'
import userImg from '../assets/user-img.svg'
import {useAuth} from '../Contexts/AuthContext'
import { Alert } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
          history.push('/')
        }).catch(()=>{
            setError("Failed to update account")
        }).finally(()=>{
            setLoading(false)
        })
    
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
                                    <h3>Update Profile</h3>
                                </div>
                                
                                {error && <Alert variant="danger">{error}</Alert>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group" id="email">
                                        <label>Email</label>
                                        <input type="email" className="form-control" ref={emailRef} required
                                        defaultValue={currentUser.email} />
                                    </div>
                                    <div className="form-group" id="password">
                                        <label>Password</label>
                                        <input type="password" 
                                        className="form-control" 
                                        placeholder="Leave blank to keep the same"
                                        ref={passwordRef} />
                                    </div>
                                    <div className="form-group" id="password-confirm">
                                        <label>Password confirmation</label>
                                        <input type="password" 
                                        className="form-control"
                                        placeholder="Leave blank to keep the same"
                                        ref={passwordConfirmRef} />
                                    </div>
                                    <div className="mt-4 mb-3">
                                        <button disabled={loading} type="submit" className="btn">Update</button> 
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link to="/" className="border-btn">Cancel</Link>
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

