import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import cn from "classnames";
import { RegisterItem } from "../interfaces";

type LogInItem = {
  login: string;
  password: string;
  rememberMe: boolean;
};

const Login: React.FC = () => {

  const history = useHistory();
  const [isUser, setIsUser] = useState<RegisterItem>({
    login: "",
    mail: "",
    password1: "",
    password2: "",
    dashBD: [],
  });
  const [logData, setLogData] = useState<LogInItem>({
    login: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    let data: RegisterItem[] = JSON.parse(localStorage.getItem("new-user") || "[]");
    const filterdData: RegisterItem[] = data.filter((item: RegisterItem) => item.login === logData.login)
    setIsUser(filterdData[0]);
  }, [logData.login]);

  const fieldItemHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogData({ ...logData, [event.target.name]: event.target.value });
  };

  const rememberMeHandler = () => {
    setLogData({ ...logData, rememberMe: !logData.rememberMe });
  };

  const loginHandler = () => {
    if(!logData.login && !logData.password) {
      alert("Enter your data!");
      return
    } else if(!logData.login && logData.password) {
      alert("Enter your login!");
      return
    } 
    if(!isUser) {
      alert("This user was not found!");
      return
    };
    if(isUser.login === logData.login && isUser.password1 !== logData.password) {
      alert("Uncorrect password!");
    } else if(isUser.login === logData.login && isUser.password1 === logData.password) {
      history.push(`/dashboard/${logData.login}`);
    }
  };

  return (
    <div className="wrapper">
      <div className="login">
        <h2 className="login__title title">Log In</h2>
        <form className="form">
          <div className="form-field">
            <input
              type="text"
              name="login"
              value={logData.login}
              onChange={(e) => fieldItemHandler(e)}
              className={cn({ active: logData.login })}
            />
            <label>Login</label>
          </div>
          <div className="form-field">
            <input
              type="password"
              name="password"
              value={logData.password}
              onChange={(e) => fieldItemHandler(e)}
              className={cn({ active: logData.password })}
            />
            <label>Password</label>
          </div>
          <div className="rememberMe">
            <input
              type="checkbox"
              checked={logData.rememberMe}
              onChange={() => rememberMeHandler()}
              className={cn("rememberMe-check", { active: logData.rememberMe })}
            />
            <label className="rememberMe-text">Remember Me</label>
          </div>
          <div className="create-account">
            <span className="create-account__text">Need an account?</span>{" "}
            <Link to="/registration" className="create-account__btn">
              Register
            </Link>
          </div>
        </form>
        <div className="login__bottom">
          <button className="login__btn button" onClick={loginHandler}>Log In</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
