import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  async function fetchRequests() {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="font-extrabold text-5xl">No connections found</h1>;

  return (
    <div className="flex flex-col items-center py-5">
      <h1 className="font-extrabold text-5xl">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;
        return (
          <div key={_id} className="flex my-2 bg-base-300 w-2/3 p-4 gap-4">
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
            <div className="flex">
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests;
