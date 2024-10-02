import React, { useState } from "react";
import InputField from "./InputField";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./utlis.scss";
import showPass from "../assets/showpass.png";
import img from "../assets/loginman.png";
import showPassBlind from "../assets/blind.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in Successfully", {
        position: "top-right",
      });

      navigate("/Home");
    } catch (error: any) {
      console.error("Login Error:", error.message);
      toast.error("Invalid Credentials", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="form-wrap">
      <div className="login-wrap">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <InputField
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <img src={img} alt="Login Image" className="men-img" />
          <InputField
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? showPass : showPassBlind}
            alt="show/hide password"
            className="show-pass"
            onClick={handleTogglePassword}
          />
          <div className="forgot-pass">Forgot Password</div>
          <div className="cta-btn">
            <button type="submit" className="login-button">
              Submit
            </button>
          </div>
          <div className="register-link">
            <p>Don't have an account?</p>
            <div className="re-direct" onClick={handleRegister}>
              Register
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
