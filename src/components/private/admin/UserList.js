import React, { useContext } from "react";
import { toast } from "react-toastify";
import { FaCheck } from 'react-icons/fa';
import { StateContext } from "../../../App";


const UserList = ({ user, index, refetch }) => {
  const [state] = useContext(StateContext);
  const { uid, email, role } = user;

  const makeAdmin = () => {
    const confirmation = window.confirm(`Are you sure to make ${email} as an admin ?`);
    if (!confirmation) {
      return;
    }
    const url = `${process.env.REACT_APP_Backend_url}/user/${uid}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        uid: state.user?.uid,
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
      <th className={`${state.user?.uid === uid && 'bg-green-500'}`}>{index + 1}</th>
      <td className={`${state.user?.uid === uid && 'bg-green-500'}`}>{email}</td>
      <td className={`${state.user?.uid === uid && 'bg-green-500'}`}>
        {role !== "admin" ?
          <button onClick={makeAdmin} className="btn btn-xs text-white">
            Make Admin
          </button> :
          <FaCheck className="w-5 h-5 mx-auto" />
        }
      </td>
      {/* <td className={`${state.user?.uid === uid && 'bg-green-500'}`}>
        <button className={`btn btn-error btn-xs text-white`} disabled={state.user?.uid === uid}>Remove User</button>
      </td> */}
    </tr>
  );
};

export default UserList;
