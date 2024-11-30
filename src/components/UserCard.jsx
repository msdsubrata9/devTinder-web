function UserCard({ user }) {
  const { firstName, lastName, age, gender, skills, about } = user;
  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              className="w-[50%]"
              src="https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png"
              alt="User Photo"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && about && <p>{age + ", " + about}</p>}
            <p>{about}</p>
            <div className="card-actions justify-between">
              <button className="btn btn-primary">Ignored</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
