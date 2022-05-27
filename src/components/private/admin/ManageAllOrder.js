import React from "react";

const ManageAllOrder = ({ order, index, handelShift, setOrder }) => {
  const {_id,name,productName,orderQuantity,transactionId,orderCost,shift,paid} = order;
  // console.log(paid , shift);
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{productName.slice(0, 26)}</td>
      <td>{orderQuantity}</td>
      <td>$ {orderCost}</td>
      <td>
        {" "}
        {paid?"Paid":"Not Paid"};{" "}
        {shift && "Shifted"}
        {paid && !shift && "Pending"}
      </td>
      <td>{transactionId ? transactionId : ""}</td>
      <td>
        <button
          className="btn btn-xs btn-success mr-2"
          disabled={!paid || shift}
          onClick={() => handelShift(_id)}
        >
          Shift
        </button>
        <label
          htmlFor="cancel-order-admin-modal"
          className=" btn-xs btn-error modal-button btn "
          onClick={() => setOrder(order)}
          disabled={paid || shift}
        >
          Cancel
        </label>
      </td>
    </tr>
  );
};

export default ManageAllOrder;
