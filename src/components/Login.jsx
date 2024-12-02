import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.error(err);
    }
  }

  async function handleSignUp() {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(response);
      dispatch(addUser(response?.data?.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-200 w-96 shadow-xl">
        <h1 className="text-center pt-5 text-2xl">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <div className="card-body">
          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              value={emailId}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password: </span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
        <p
          className="m-auto cursor-pointer py-2"
          onClick={() => {
            setIsLogin((value) => !value);
          }}
        >
          {isLogin ? "New User? Sign Up Here" : "Existing User? Login Here"}
        </p>
      </div>
    </div>
  );
}

export default Login;
