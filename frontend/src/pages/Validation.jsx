import { useEffect, useRef, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Nvabar"
import axios from "axios"
import { useAuth } from "../assets/useAuth"

const Validation = () => {
    const {token, navigate} = useAuth()
    const [isDisabled, setIsDisbled] = useState(true)
    const experinceRef = useRef()
    const categoryRef = useRef()
    const positionRef = useRef()
    const reasonRef = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = {
            work_experience: experinceRef.current.value,
            job_category: categoryRef.current.value,
            job_position: positionRef.current.value,
            reason_accepted: reasonRef.current.value
        }

        try{
            const response = await axios.post("http://localhost:8000/api/v1/validation", data,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            navigate("/dashboard")
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(() => {
        console.log(isDisabled)
    }, [isDisabled])
    return(
        <>
        <Navbar/>
            <main>
                <header class="jumbotron">
                    <div class="container">
                        <h1 class="display-4">Request Data Validation</h1>
                    </div>
                </header>
                <div class="container">

                    <form action="">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="d-flex align-items-center mb-3">
                                        <label class="mr-3 mb-0">Job Category</label>
                                        <select class="form-control-sm" ref={categoryRef}>
                                            <option value="1">Computing and ICT</option>
                                            <option value="2">Construction and building</option>
                                            <option value="3">Animals, land and environment</option>
                                            <option value="4">Design, arts and crafts</option>
                                            <option value="5">Education and training</option>
                                        </select>
                                    </div>
                                    <textarea class="form-control" cols="30" rows="5" placeholder="Job position sparate with , (comma)" ref={positionRef}></textarea>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="d-flex align-items-center mb-3">
                                        <label class="mr-3 mb-0">Work Experiences ?</label>
                                        <select class="form-control-sm" onChange={(e) => setIsDisbled(e.target.value == "true")}>
                                            <option value={true}>No</option>
                                            <option value={false}>Yes, I have</option>
                                        </select>
                                    </div>
                                    <textarea class="form-control" cols="30" rows="5" placeholder="Describe your work experiences" disabled={isDisabled} ref={experinceRef}></textarea>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="d-flex align-items-center mb-3">
                                        <label class="mr-3 mb-0">Reason Accepted</label>
                                    </div>
                                    <textarea class="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted" ref={reasonRef}></textarea>
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-primary" onClick={handleSubmit}>Send Request</button>
                    </form>
                </div>
            </main>
        <Footer/>
        </>
    )
}


export default Validation