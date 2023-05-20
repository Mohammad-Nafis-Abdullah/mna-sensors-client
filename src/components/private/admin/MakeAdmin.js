// import axios from "axios";
import React from "react";
import UserList from "./UserList";
import { useQueryFetch } from "../../../hooks/useQueryFetch";
import Loading from "../../public/Loading";


const MakeAdmin = () => {
  const { data: users, loading, refetch } = useQueryFetch('all-user',`${process.env.REACT_APP_Backend_url}/users`, []);

  return (
    <div className="fadeIn">
      {loading && <Loading/>}
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
