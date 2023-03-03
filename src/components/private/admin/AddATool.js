import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddATool = () => {
  const { register, handleSubmit, reset } = useForm();


  const onSubmit = async (data) => {
    const name = data.name;
    const img = data.img;
    const details = data.details;
    const unitPrice = parseInt(data.unitPrice);
    const minQuantity = parseInt(data.minQuantity);
    const availableQuantity = parseInt(data.availableQuantity);
    // data.unitPrice = unitPrice;
    const sensor = {
      name: name,
      img: img,
      details: details,
      unitPrice: unitPrice,
      minQuantity: minQuantity,
      availableQuantity: availableQuantity,
    };
    console.log(sensor);

    const url = "http://localhost:5000/sensor";
    axios
      .post(url, sensor, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((inserted) => {
        if (inserted.data.insertedId) {
          toast.success(`${name} is added Successfully`, {
            theme: "colored",
          });
          reset();
        } else {
          toast.error("Failed to Add sensor", { theme: "colored" });
        }
        // console.log(inserted.data);
      });
  };
  return (
    <div className="fadeIn">
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
                className="input input-bordered text-neutral-focus font-semibold"
                type="text"
                placeholder="Image URL"
                {...register("img", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-neutral-focus">Details</span>
              </label>
              <textarea
                className="input input-bordered text-neutral-focus font-semibold h-20"
                placeholder="Details"
                {...register("details", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-xs text-neutral-focus">
                    Sensor Price <small>(USD)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-neutral-focus font-semibold"
                  placeholder="Sensor Price"
                  type="number"
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
