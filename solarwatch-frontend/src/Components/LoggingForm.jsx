import { useState } from "react";
import { Link, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoggingForm = ({isHandleRegister})=>{
    const [saveUsername,setSaveUsername] = useState("");
    const [saveEmail,setSaveEmail] = useState("");
    const [savePassword,setSavePassword] = useState("");
    const Navigate = useNavigate();

    const handleRegister = (e)=>{
        e.preventDefault();
        console.log("registering..")
        fetch("https://localhost:7008/Auth/Register", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                username : saveUsername,
                email : saveEmail,
                password : savePassword
            })

        }).then((res) => res.json())
        .then((data) => {
          console.log("Registration response:", data);
          Navigate("/");
        })
        .catch((error) => {
          console.error("Registration error:", error);
        });
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        console.log("Logging in..")
        fetch("https://localhost:7008/Auth/Login", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                email : saveEmail,
                password : savePassword
            })

        }).then((res) => res.json())
        .then((data) => {
          console.log("Login response:", data);
          if(data.token){
            localStorage.setItem("token",data.token);
          }
          Navigate("/");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    }
    

    return (
        <>
          <div className="form">
            {!isHandleRegister ? (
              <>
                <div className="title2">Please Log In!</div>
                <div className="subtitle"></div>
              </>
            ) : (
              <>
                <div className="title2">Welcome</div>
                <div className="subtitle">Let's create your account!</div>
              </>
            )}
            {isHandleRegister && (
              <div className="input-container ic1">
                <input
                  id="firstname"
                  className="input"
                  type="text"
                  placeholder="username"
                  onChange={(e) => setSaveUsername(e.target.value)}
                />
                <div className="cut"></div>
              </div>
            )}
    
            <div className="input-container ic2">
              <input
                id="email"
                className="input"
                type="text"
                placeholder="email"
                onChange={(e) => setSaveEmail(e.target.value)}
              />
              <div className="cut cut-short"></div>
            </div>
    
            <div className="input-container ic2">
              <input
                id="lastname"
                className="input"
                type="password"
                placeholder="password"
                onChange={(e) => setSavePassword(e.target.value)}
              />
              <div className="cut"></div>
            </div>
            {isHandleRegister ? (
              <>
                <button type="text" className="submit" onClick={handleRegister}>
                  Register
                </button>
                <div className="subtitle">
                  <Link to="/login">Login</Link>
                </div>
              </>
            ) : (
              <>
                <button type="text" className="submit" onClick={handleLogin}>
                  Login
                </button>
                <div className="subtitle">
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}
          </div>
        </>
      );
}
export default LoggingForm;