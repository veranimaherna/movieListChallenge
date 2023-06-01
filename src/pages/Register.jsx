import React, { useState } from "react";
import FormLogin from "../components/login/FormLogin";
import "./register.css";
import googleIcon from "../assets/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character",
      label: "Username",
      pattern: `^[A-Za-z0-9]{3,16}$`,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: values.username,
        });
        navigate("/login");
      });
    } catch (error) {
      alert("Register failed");
    }
  };

  const signInwithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //console.log(result);
        const user = result.user;
        navigate("/home");
      })
      .catch((error) => {
        alert("Error Login");
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormLogin
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button
          className="registerButton"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="haveAccount">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
        <p>OR</p>
        <Link to="#">
          <button
            className="loginButton"
            id="googleLogin"
            onClick={signInwithGoogle}
          >
            <img src={googleIcon} alt="google icon" />
            SignUp with Google
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
