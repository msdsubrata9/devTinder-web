function UserCard({ user }) {
  const { firstName, lastName, age, gender, skills, about, photoUrl } = user;
  return (
    <div>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-xl h-[80vh]">
          <figure>
            <img className="w-[50%]" src={photoUrl} alt="User Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
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
