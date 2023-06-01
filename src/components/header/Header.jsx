import React, { useRef, useEffect, useState, useCallback } from "react";

import { useNavigate, useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";

import "./header.scss";
import Input from "../input/Input";
import Button, { OutlineButton } from "../button/Button";

import { UilSearch } from "@iconscout/react-unicons";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/movie/search/${keyword}`);
    }
  }, [keyword, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Search Movie..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        <UilSearch className="icon-search" />
      </Button>
    </div>
  );
};

const Header = (props) => {
  const location = useLocation();
  const isLogin = location.pathname === "/home";

  const headerRef = useRef(null);

  const { keyword } = useParams();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch({type: "LOGOUT"});
    navigate("/");
  }


  return (
    <div ref={headerRef} className="header">
      {!isLogin && (
        <div className="header__wrap container">
          <div className="logo">
            <Link to="/" className="logo__name">
              MovieList
            </Link>
          </div>
          <div className="search">
            <MovieSearch keyword={keyword} />
          </div>
          <ul className="header__nav">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <OutlineButton>Register</OutlineButton>
            </Link>
          </ul>
        </div>
      )}

      {!!isLogin && (
        <div className="header__wrap container">
          <div className="logo">
            <Link to="/home" className="logo__name">
              MovieList
            </Link>
          </div>
          <div className="search">
            <MovieSearch keyword={keyword} />
          </div>
          <ul className="header__genres">
            <Link to="/movie" className="popular">
              Recommended For {currentUser?.displayName}
            </Link>
            <span onClick={handleLogout}><Link className="signOut">
              Sign Out
            </Link></span>
          </ul>
        </div>
      )}

    </div>
  );
};

export default Header;
