import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function Login() {
  const [emailId, setEmailId] = useState("tilak@gmail.com");
  const [password, setPassword] = useState("Tilak@1234");
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
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
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </label>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
