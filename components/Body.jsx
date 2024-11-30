import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchUserData() {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.body));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
