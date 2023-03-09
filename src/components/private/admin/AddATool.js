/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useMyStorage from "../../../hooks/useMyStorage";
import Loading from "../../public/Loading";

const AddATool = () => {
  const [user] = useAuthState(auth);
  const { register, handleSubmit, reset } = useForm();
  const { uploadImage, deleteImage } = useMyStorage();
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    setLoading(true);
    const name = data.name;
    const img = data.img?.[0];
    const details = data.details;
    const unitPrice = parseInt(data.unitPrice);
    const minQuantity = parseInt(data.minQuantity);
    const availableQuantity = parseInt(data.availableQuantity);
    // data.unitPrice = unitPrice;
    if (unitPrice<=0 || minQuantity<=0 || availableQuantity<=0) {
      toast.error('Negative value of number input is not accepted',{theme:'colored'});
      setLoading(false);
      return;
    }
    const sensor = {
      name: name,
      details: details,
      unitPrice: unitPrice,
      minQuantity: minQuantity,
      availableQuantity: availableQuantity,
    };
    // console.log(sensor);

    try {
      const { name } = await uploadImage(img);
      sensor.img = name;
      const { data } = await axios.post('http://localhost:5000/sensor', sensor, {
        headers: {
          uid: user?.uid,
        },
      });
      data.insertedId && toast.success(`Sensor successfully added.`, {
        theme: "dark",
      });
      reset();

    } catch (err) {
      toast.error("Failed to Add sensor", { theme: "colored" });
      console.log(err);
    }
    setLoading(false);
  };



  return (
    <div className="fadeIn">
      {loading && <Loading />}
      <div className="flex justify-center">
        <form
          className="form card w-full max-w-md sm:max-w-lg lg:max-w-lg bg-white mx-3 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-5">
            <h2 className="text-2xl font-bold text-neutral-focus"> Add A New sensor</h2>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-neutral-focus">Name</span>
              </label>
              <input
                className="input input-bordered text-neutral-focus font-semibold"
                type="text"
                placeholder="sensor Name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-neutral-focus">Image URL</span>
              </label>
              <input
                type="file"
                className="border-2 min-w-0"
                accept=".jpg,.png,.jpeg"
                {...register("img", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-neutral-focus">Details</span>
              </label>
              <textarea
                className="input input-bordered text-neutral-focus font-semibold h-40 resize-none overflow-y-auto"
                placeholder="Details"
                {...register("details", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-xs text-neutral-focus">
                    Sensor Price <small>(BDT)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-neutral-focus font-semibold"
                  placeholder="Sensor Price"
                  type="number"
                  onWheel={function (e) {
                    e.target.blur();
                  }}
                  {...register("unitPrice", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-xs text-neutral-focus">
                    Min Quantity <small>(Pcs)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-neutral-focus font-semibold"
                  placeholder="Minimum Quantity"
                  type="number"
                  onWheel={function (e) {
                    e.target.blur();
                  }}
                  {...register("minQuantity", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-xs text-neutral-focus">
                    Available Quantity <small>(Pcs)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-neutral-focus font-semibold"
                  placeholder="Available Quantity"
                  type="number"
                  onWheel={function (e) {
                    e.target.blur();
                  }}
                  {...register("availableQuantity", { required: true })}
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn font-bold" type="submit">
                Add sensor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddATool;
