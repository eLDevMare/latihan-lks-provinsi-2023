import { useEffect, useState } from "react";
import { useAuth } from "../assets/useAuth";
import Footer from "../components/Footer";
import Navbar from "../components/Nvabar";
import axios from "axios";

const Dashboard = () => {
    const {token,navigate} = useAuth()
    const [dataValidation, setDataValidation] = useState([])
    const [dataJob, setDataJob] = useState([])


    const getValidation = async() => {
        const response = await axios.get("http://localhost:8000/api/v1/validations", {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        console.log(response.data.validation)
        setDataValidation(response.data.validation)
    }


    const getJob = async() => {

        const response = await axios.get("http://localhost:8000/api/v1/applications", {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })

        setDataJob(response.data.vacancies)
        console.log(response.data.vacancies)

    }

    useEffect(() => {
        getValidation()
        getJob()
    },[])

    return(
        <div>
            <Navbar/>
                <main>
                    <header class="jumbotron">
                        <div class="container">
                            <h1 class="display-4">Dashboard</h1>
                        </div>
                    </header>
                    <div class="container">
                        <section class="validation-section mb-5">
                            <div class="section-header mb-3">
                                <h4 class="section-title text-muted">My Data Validation</h4>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card card-default">
                                        <div class="card-header">
                                            <h5 class="mb-0">Data Validation</h5>
                                        </div>
                                        <div class="card-body">
                                            <a href="/validation" class="btn btn-primary btn-block">+ Request validation</a>
                                        </div>
                                    </div>
                                </div>
                                    {
                                        dataValidation?.map((item) => (
                                            <div class="col-md-4">
                                                <div class="card card-default">
                                                    <div class="card-header border-0">
                                                        <h5 class="mb-0">Data Validation</h5>
                                                    </div>
                                                    <div class="card-body p-0">
                                                        <table class="table table-striped mb-0">
                                                            <tr>
                                                                <th>Status</th>
                                                                <td><span class="badge badge-info">{item.status}</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Job Category</th>
                                                                <td class="text-muted">{item.job_category_id}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Job Position</th>
                                                                <td class="text-muted">{item.job_position}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Reason Accepted</th>
                                                                <td class="text-muted">{item.reason_accepted}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Validator</th>
                                                                <td class="text-muted">{item.validator}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Validator Notes</th>
                                                                <td class="text-muted">{item.validator_notes}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                            </div>
                        </section>
                        <section class="validation-section mb-5">
                            <div class="section-header mb-3">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h4 class="section-title text-muted">My Job Applications</h4>
                                    </div>
                                    <div class="col-md-4">
                                        <a href="/vacancies" class="btn btn-primary btn-lg btn-block">+ Add Job Applications</a>
                                    </div>
                                </div>
                            </div>
                            <div class="section-body">
                                <div class="row mb-4">
                                    <div class="col-md-12">
                                        <div class="alert alert-warning">
                                            Your validation must be approved by validator to applying job.
                                        </div>
                                    </div>
                                    {
                                        dataJob?.map((item) => (
                                            <div class="col-md-6">
                                                <div class="card card-default">
                                                    <div class="card-header border-0">
                                                        <h5 class="mb-0">{item.company}</h5>
                                                    </div>
                                                    <div class="card-body p-0">
                                                        <table class="table table-striped mb-0">
                                                            <tr>
                                                                <th>Address</th>
                                                                <td class="text-muted">{item.address}</td>
                                                            </tr>
                                                            <tr>
                                                            <th>Position</th>
                                                                <td class="text-muted">
                                                                        <ul>
                                                                {
                                                                    item.position?.map((itemm) => (
                                                                        <>                                                                        
                                                                            <li>{itemm.position} <span class="badge badge-info">{itemm.apply_status}</span></li>
                                                                        </>
                                                                    ))
                                                                }
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Apply Date</th>
                                                                <td class="text-muted">September 12, 2023</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Notes</th>
                                                                <td class="text-muted">{item.position[0]?.notes}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            <Footer/>
        </div>
    )
}

export default Dashboard;