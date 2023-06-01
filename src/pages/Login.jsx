import React, { useState } from "react";
import FormLogin from "../components/login/FormLogin";
import "./login.css";
import googleIcon from "../assets/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      signInWithEmailAndPassword(auth, values.email, values.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          //console.log(user);
          navigate("/home");
        }
      );
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
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
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormLogin
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="loginButton" type="submit" onClick={handleLogin}>
          Login
        </button>
        <div className="haveAccount">
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
        <p>OR</p>
        <Link to="#">
          <button
            className="loginButton"
            id="googleLogin"
            onClick={signInwithGoogle}
          >
            <img src={googleIcon} alt="google icon" />
            Login with Google
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
