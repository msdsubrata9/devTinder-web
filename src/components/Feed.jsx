import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  async function getFeed() {
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data));
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getFeed();
  }, []);
  if (!feedData) return;
  if (feedData.length <= 0)
    return <h1 className="font-extrabold text-5xl">Noone found</h1>;
  return <div>{feedData && <UserCard user={feedData[0]} />}</div>;
}

export default Feed;
