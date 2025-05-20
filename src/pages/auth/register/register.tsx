import { useNavigate } from "react-router-dom"
import RegisterPartial from "../../../components/partials/register"

const Register = () => {
        const navigate = useNavigate()
    return (
        <>
        <RegisterPartial classname="flex w-full fixed justify-between" navigate={() => navigate("/auth/login")}/>
        </>
    )
}

export default Register