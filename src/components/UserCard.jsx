import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const dispatch = useDispatch();
  async function handleSendRequest(status, userId) {
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/request/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  }
  const { _id, firstName, lastName, age, gender, skills, about, photoUrl } =
    user;

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure>
            <img className="w-[50%]" src={photoUrl} alt="User Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-between">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleSendRequest("ignored", _id);
                }}
              >
                Ignored
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleSendRequest("interested", _id);
                }}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
