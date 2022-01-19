import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import cn from "classnames";
import { RegisterItem } from "../interfaces";

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterItem>({
    login: "",
    mail: "",
    password1: "",
    password2: "",
    dashBD: []
  });
  const [users, setUsers] = useState<RegisterItem[]>([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let data: RegisterItem[] = JSON.parse(localStorage.getItem("new-user") || "[]");
    setUsers(data);
  }, []);

  useEffect(() => {
    if(registerData.login && registerData.mail && registerData.password1 && registerData.password2) {
      localStorage.setItem("new-user", JSON.stringify(users));
    }  
  }, [users])

  const fieldItemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = () => {
    if (!registerData.login && registerData.mail && registerData.password1 && registerData.password2) {
      alert("Enter your login!");
    } else if (!registerData.mail && registerData.login && registerData.password1 && registerData.password2) {
      alert("Enter your mail!");
    } else if (!registerData.password1 && registerData.login && registerData.mail && registerData.password2) {
      alert("Enter your password!");
    } else if (!registerData.password2 && registerData.login && registerData.mail && registerData.password1) {
      alert("Confirm your password!");
    } else if(registerData.password1 !== registerData.password2) {
      alert("Repeated password incorrectly")
    } else if (registerData.login && registerData.mail && registerData.password1 && registerData.password2) {
      setUsers((prev) => [...prev, registerData]);
      setIsAuth(true);
    } else {
      alert("Enter your data!");
    }
  };

  if(isAuth) return <Redirect to={`/dashboard/${registerData.login}`} />;

  return (
    <div className="wrapper">
      <div className="register">
        <h2 className="register__title title">Register</h2>
        <form className="form">
          <div className="form-field">
            <input
              type="text"
              name="login"
              value={registerData.login}
              onChange={(e) => fieldItemHandler(e)}
              className={cn({ active: registerData.login })}
            />
            <label>Login</label>
          </div>
          <div className="form-field">
            <input
              type="text"
              name="mail"
              value={registerData.mail}
              onChange={(e) => fieldItemHandler(e)}
              className={cn({ active: registerData.mail })}
            />
            <label>Mail</label>
          </div>
          <div className="form-field">
            <input
              type="password"
              name="password1"
              value={registerData.password1}
              onChange={(e) => fieldItemHandler(e)}
              className={cn({ active: registerData.password1 })}
            />
            <label>Password</label>
          </div>
          <div className="form-field">
            <input
              type="password"
              name="password2"
              value={registerData.password2}
              onChange={(e) => fieldItemHandler(e)}
              className={cn({ active: registerData.password2 })}
            />
            <label>Confirm password</label>
          </div>
          <div className="already-have">
            <span className="already-have__text">Already have an account?</span>{" "}
            <Link to="/login" className="already-have__btn">
              Log In
            </Link>
          </div>
        </form>
        <div className="register__bottom">
          <button className="register__btn button" onClick={registerHandler}>
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
