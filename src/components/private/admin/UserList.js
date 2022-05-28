import React from "react";
import { toast } from "react-toastify";

const UserList = ({ user, index, refetch }) => {
  const { email, role } = user;

  const makeAdmin = () => {
    const url = `https://cryptic-tor-95332.herokuapp.com/user/${email}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to make an Admin", { theme: "colored" });
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`${email} is added as an Admin Successfully`, {
            theme: "colored",
          });
        }
      });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
        {role !== "admin" && (
          <button onClick={makeAdmin} className="btn btn-xs text-white">
            Make Admin
          </button>
        )}
      </td>
      <td>
        <button className="btn btn-error btn-xs text-white">Remove User</button>
      </td>
    </tr>
  );
};

export default UserList;
