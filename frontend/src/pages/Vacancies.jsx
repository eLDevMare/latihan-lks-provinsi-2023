import { useEffect, useState } from "react"
import { useAuth } from "../assets/useAuth"
import Footer from "../components/Footer"
import Navbar from "../components/Nvabar"
import axios from "axios"

const Vacancies = () => {
    const {token, navigate} = useAuth()
    const [data,setData] = useState([])

    const getData = async() => {
        const response = await axios.get("http://localhost:8000/api/v1/job_vacancies", {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })

        setData(response.data.vacancies)
        console.log(response.data.vacancies)
    }


    useEffect(() => {
        getData()
    },[])
    
    
    return (
        <>
            <Navbar/>
            <main>
                <header class="jumbotron">
                    <div class="container">
                        <h1 class="display-4">Job Vacancies</h1>
                    </div>
                </header>
                <div class="container mb-5">

                    <div class="section-header mb-4">
                        <h4 class="section-title text-muted font-weight-normal">List of Job Vacancies</h4>
                    </div>

                    <div class="section-body">
                        {
                            data?.map((item) => (
                                <>                                
                                    <article class="spot">
                                        <div class="row">
                                            <div class="col-5">
                                                <h5 class="text-primary">{item.company}</h5>
                                                <span class="text-muted">{item.address}</span>
                                            </div>
                                            <div class="col-4">
                                                <h5>Available Position (Capacity)</h5>
                                                {
                                                    item.available_position?.map((itemm) => (
                                                        <>
                                                            <span class="text-muted">{itemm.position} ({itemm.capacity}), </span>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                            <div class="col-3">
                                                <a class="btn btn-danger btn-lg btn-block" href={`/detail/${item.id}`}>
                                                    Detail / Apply
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </>
                            ))
                        }
                    </div>
                </div>
            </main>    
            <Footer/>
        </>
    )
}

export default Vacancies