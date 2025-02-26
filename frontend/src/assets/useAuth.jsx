import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    return{token, navigate}
}