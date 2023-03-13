import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import { FaCheck } from 'react-icons/fa';


const UserList = ({ user, index, refetch }) => {
  const [currentUser] = useAuthState(auth);
  const { uid, email, role } = user;

  const makeAdmin = () => {
    const confirmation = window.confirm(`Are you sure to make ${email} as an admin ?`);
    if (!confirmation) {
      return;
    }
    const url = `http://localhost:5000/user/${uid}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        uid:currentUser?.uid,
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
    <tr className="text-center">
      <th className={`${currentUser?.uid === uid && 'bg-green-500'}`}>{index + 1}</th>
      <td className={`${currentUser?.uid === uid && 'bg-green-500'}`}>{email}</td>
      <td className={`${currentUser?.uid === uid && 'bg-green-500'}`}>
        {role !== "admin"? 
          <button onClick={makeAdmin} className="btn btn-xs text-white">
            Make Admin
          </button>:
          <FaCheck className="w-5 h-5 mx-auto"/>
        }
      </td>
      {/* <td className={`${currentUser?.uid === uid && 'bg-green-500'}`}>
        <button className={`btn btn-error btn-xs text-white`} disabled={currentUser?.uid === uid}>Remove User</button>
      </td> */}
    </tr>
  );
};

export default UserList;
