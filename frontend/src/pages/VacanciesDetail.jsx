import { useEffect, useRef, useState } from "react"
import { useAuth } from "../assets/useAuth"
import Footer from "../components/Footer"
import Navbar from "../components/Nvabar"
import axios from "axios"
import { useParams } from "react-router-dom"

const VacanciesDetail = () => {
    const {token, navigate} = useAuth()
    const [data,setData] = useState([])
    const {id} = useParams()
    const notesRef = useRef()
    const [positionData, setDataPosition] = useState([])
    const [err, setErr] = useState("")
    
    const getData = async() => {
        const response = await axios.get(`http://localhost:8000/api/v1/job_vacancies/${id}`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        setData(response.data.vacancies[0])
        console.log(response.data.vacancies[0])
    }

    const handlePosition = (value) => {
        const exists = positionData.includes(value)
        if(!exists){
            setDataPosition((prev) => ([...prev, value]))
        }

        if(exists){
            setDataPosition((prev) => (prev.filter((item) => (item !== value))))
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const dataLast = {
            vacancy_id: id,
            notes: notesRef.current.value,
            positions: positionData
        }

        try{
            console.log(dataLast)
            const response = await axios.post("http://localhost:8000/api/v1/applications", dataLast, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })

            navigate("/dashboard")
            console.log(response)
        }catch(e){
            console.log(e.response.data.message)
            setErr(e.response.data.message)
        }
    }

    useEffect(() => {
    getData()
    console.log(positionData)
    },[positionData])
    
    return(
        <>
            <Navbar/>
            <main>
                <header class="jumbotron">
                    <div class="container text-center">
                        <div>
                            <h1 class="display-4">{data.company}</h1>
                            <span class="text-muted">{data.address}</span>
                        </div>
                    </div>
                </header>
                <div class="container">

                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-group">
                                <h3>Description</h3>
                                some description of job vacancy
                            </div>
                        </div>
                    </div>
                    {
                        err ? (
                            <div class="alert alert-warning">
                                    Your validation must be approved by validator to applying job.
                            </div>
                        ) : (
                            <></>
                        )
                    }
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="form-group">
                                <h3>Select position</h3>
                                <table class="table table-bordered table-hover table-striped"> 
                                    <tr>
                                        <th width="1">#</th>
                                        <th>Position</th>
                                        <th>Capacity</th>
                                        <th>Application / Max</th>
                                        <th rowspan="4" style={{verticalAlign: "middle", whiteSpace: "nowrap"}} width="1">
                                            <button onClick={handleSubmit} class="btn btn-primary btn-lg">Apply for this job</button>
                                        </th>
                                    </tr>
                                    {
                                        data.available_position?.map((itemm) => (
                                            <>                                            
                                                <tr>    
                                                    <td><input onClick={() => handlePosition(itemm.position)} type="checkbox"/></td>
                                                    <td>{itemm.position}</td>
                                                    <td>{itemm.capacity}</td>
                                                    <td>{itemm.apply_capacity}</td>
                                                </tr>
                                            </>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                                    
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Notes for Company</label>
                                </div>
                                <textarea class="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted" ref={notesRef}></textarea>
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            <Footer/>
        </>
    )
}

export default VacanciesDetail