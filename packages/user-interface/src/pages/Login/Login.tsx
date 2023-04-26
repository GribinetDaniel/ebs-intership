import React, { useState, useContext } from "react";
import { mainAxios } from "../../utils/main-axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { isAxiosError } from "axios";
import { useMutation } from "react-query";
import { catchAxiosError } from "../../utils";
import "./index.scss";

export function Login() {
 const navigate = useNavigate();
 const { setIsAuth, setUser } = useContext(UserContext);
 const [newUser, setNewUser] = useState({
  username: "",
  password: "",
 });
 const [errors, setErrors] = React.useState({
  username: "",
  password: "",
 });

 const loginMutation = useMutation({
  mutationFn: (newUser: { username: string; password: string }) => {
   return mainAxios.post("/auth/login", newUser);
  },
 });

 const accountMutation = useMutation({
  mutationFn: (data: any) => {
   return mainAxios.get("/account");
  },
 });

 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewUser({ ...newUser, [event.target.name]: event.target.value });
 };

 function handleSubmit() {
  loginMutation.mutate(newUser, {
   onSuccess(data) {
    localStorage.setItem("token", data.data.token);
    accountMutation.mutate(data, {
     onSuccess(data) {
      setUser(data.data);
      setIsAuth(true);
      navigate("/");
     },
     onError(err) {
      console.log(err);
     },
    });
   },
   onError(err) {
    if (isAxiosError(err)) setErrors(catchAxiosError(err));
    else console.log(err);
    setNewUser({ ...newUser, password: "" });
   },
  });
 }
 return (
  <div className="login">
   <div className="login__left-part">
    <div>
     <h2>Welcome back</h2>
     <p className="login__text">Welcome back! Please enter our details</p>
     <form>
      <Input
       label="Username"
       type="text"
       name="username"
       placeholder="Enter your username"
       value={newUser.username}
       onChange={handleInput}
       errors={errors.username}
      />
      <Input
       label="Password"
       type="password"
       name="password"
       placeholder="********"
       value={newUser.password}
       onChange={handleInput}
       errors={errors.password}
      />
      <Button
       type="primary"
       onClick={handleSubmit}
       style={{ padding: "10px 20px", margin: "20px 0px" }}
       disabled={loginMutation.isLoading || accountMutation.isLoading}
      >
       Sign In
      </Button>
      <p>
       Don't have an account?{" "}
       <Link to={"/register"} className="login__link">
        Sign Up
       </Link>
      </p>
     </form>
    </div>
   </div>
   <div className="login__right-part">
    <div className="login__upper-half">
     <div className="login__upper-half--half-circle"></div>
    </div>
    <div className="login__down-half">
     <div className="login__down-half--half-circle"></div>
    </div>
   </div>
  </div>
 );
}
