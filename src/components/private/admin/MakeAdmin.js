// import axios from "axios";
import React from "react";
import useFetch from "../../../hooks/useFetch";
// import Loading from "../../Shared/Loading";
import UserList from "./UserList";


const MakeAdmin = () => {
  const url = "https://mna-sensors-server.onrender.com/users";
  const { data: users, refetch } = useFetch(url, []);
  return (
    <div className="fadeIn">
      <h2 className="text-left ml-3 text-lg text-white font-bold">
        All Users: {users?.length}
      </h2>
      <div className="overflow-x-auto mx-5">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-center">
              <th>Sl No.</th>
              <th>Email</th>
              <th>Make Admin</th>
              {/* <th>Remove User</th> */}
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <UserList
                key={user._id}
                index={index}
                refetch={refetch}
                user={user}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
