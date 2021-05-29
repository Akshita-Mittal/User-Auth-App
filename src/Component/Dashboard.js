import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../Contexts/AuthContext'


export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout (){
      setError('')

      try{
        await logout()
        history.push('/login')
      } catch{
          setError('Failed to logout')
      }
    }

    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                            <div className="w-100 text-center">
                                <h3>Welcome User</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                            </div>
                            <p className="w-100 text-center">{currentUser.email}</p>
                            <div className="mt-4 mb-3">
                                <Link to="/update-profile" className="border-btn">Update Profile</Link> 
                            </div>
                            <div className="mt-3 mb-4">
                                <button 
                                type="submit" 
                                variant="link" 
                                onClick={handleLogout} 
                                className="btn">Log Out</button> 
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
