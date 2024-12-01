import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  async function fetchConnections() {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="flex flex-col items-center py-5">
      <h1 className="font-extrabold text-5xl">Connections</h1>
      {connections.map((connection) => {
        console.log(connection);
        const { firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div className="flex my-2 bg-base-300 w-1/2 p-4 gap-4">
            <div>
              <img className="h-20 w-20 rounded-full" src={photoUrl} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">
                {firstName + " " + lastName}
              </h1>
              {age && gender && (
                <h3 className="text-xl">{age + ", " + gender}</h3>
              )}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Connections;
