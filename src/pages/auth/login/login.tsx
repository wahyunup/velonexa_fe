import PartialLogin from "../../../components/partials/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

  return (
    <>
     <PartialLogin  classname="flex w-full fixed justify-between" navigate={() => navigate("/auth/register")}/>
    </>
  );
};

export default Login;
