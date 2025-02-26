import Footer from "../components/Footer"
import Navbar from "../components/Nvabar"
import { useAuth } from "../assets/useAuth"
import { useEffect, useRef } from "react"
import axios from "axios"

const Login = () => {
    const {token, navigate} = useAuth()
    const cardNumberRef = useRef()
    const passwordRef = useRef()
    
    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = {
            id_card_number: cardNumberRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        }

        try{
            const response = await axios.post(`http://localhost:8000/api/v1/auth/login`,data)
            console.log(response.data[0])
            localStorage.setItem("token", response.data[0].token)
            localStorage.setItem("name", response.data[0].name)
            navigate("/dashboard")
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(token){
            navigate("/dashboard")
        }
    },[])
    return (
        <>
        <Navbar/>
            <main>
                <header class="jumbotron">
                    <div class="container text-center">
                        <h1 class="display-4">Job Seekers Platform</h1>
                    </div>
                </header>

                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <form class="card card-default">
                                <div class="card-header">
                                    <h4 class="mb-0">Login</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group row align-items-center">
                                        <div class="col-4 text-right">ID Card Number</div>
                                        <div class="col-8"><input type="text" ref={cardNumberRef} class="form-control"/></div>
                                    </div>
                                    <div class="form-group row align-items-center">
                                        <div class="col-4 text-right">Password</div>
                                        <div class="col-8"><input type="password" ref={passwordRef} class="form-control"/></div>
                                    </div>
                                    <div class="form-group row align-items-center mt-4">
                                        <div class="col-4"></div>
                                        <div class="col-8"><button class="btn btn-primary" onClick={handleSubmit}>Login</button></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Login