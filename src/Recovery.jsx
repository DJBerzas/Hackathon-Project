import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom"   

function Recovery() {
    const navigate = useNavigate();

    const goToForms= () => {
        navigate("/FormsPage");
      };
    const goToHome = () => {
          navigate("/");
        };

    return (
        <div>
            <h1>Welcome to Recovery</h1>
            <button onClick={goToHome}>Home</button>
            <button onClick={goToForms}>To Form</button>
        </div>
    );
}

export default Recovery;
