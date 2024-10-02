import React, { useState } from "react";
import InputField from "./InputField";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./utlis.scss";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        const userData = {
          email: user.email,
          fullName: fname,
          password: password,
          phonenumber: phonenumber,
        };

        const firebaseURL = `https://easyshop-fe29c-default-rtdb.firebaseio.com/users.json`;

        const response = await fetch(firebaseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), 
        });

        if (response.ok) {
          toast.success("Registered Successfully!!", {
            position: "top-right",
          });
          navigate("/login");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to save user to the database");
        }
      }
    } catch (error: any) {
      console.error("Registration Error:", error.message);
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="form-wrap">
      <div className="register-wrap">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>

          <InputField
            type="text"
            value={fname}
            placeholder="Enter Full Name"
            onChange={(e) => setFname(e.target.value)}
          />

          <InputField
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            type="number"
            value={phonenumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className="cta-btn">
            <button type="submit">Submit</button>
          </div>

          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
