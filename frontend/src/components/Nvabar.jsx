import { useEffect, useState } from "react"
import { useAuth } from "../assets/useAuth"
import axios from "axios"

const Navbar = () => {
    const {token, navigate} = useAuth()
    const name = localStorage.getItem("name")
    const [dataValidation, setDataValidation] = useState([])
    
    const handleLogout = async(e) => {
        e.preventDefault()

        try{
            const response = await axios.post("http://localhost:8000/api/v1/auth/logout", {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response)
            localStorage.removeItem("name")
            localStorage.removeItem("token")
            navigate("/login")
        } catch(e){
            console.log(e)
        }        
    }

    
    useEffect(() => {
        if(!token){
            navigate("/login")
        }
    },[])
    return (
        <>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="#">Job Seekers Platform</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav ml-auto">
                            {
                                name ? 
                                (
                                <>                                
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">{name}</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link"  onClick={handleLogout}>Logout</a>
                                    </li>
                                </>
                                ) : (
                                <>                                
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Login</a>
                                    </li>
                                </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar