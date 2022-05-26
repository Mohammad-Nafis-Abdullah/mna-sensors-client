import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddATool = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const name = data.name;
    const img = data.img;
    const description = data.description;
    const price = parseInt(data.price);
    const minOrderQuantity = parseInt(data.minOrderQuantity);
    const availableQuantity = parseInt(data.availableQuantity);
    // data.price = price;
    const tool = {
      name: name,
      img: img,
      description: description,
      price: price,
      minOrderQuantity: minOrderQuantity,
      availableQuantity: availableQuantity,
    };
    console.log(tool);

    const url = "http://localhost:5000/tool";
    axios
      .post(url, tool, {
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
          toast.error("Failed to Add Tool", { theme: "colored" });
        }
        // console.log(inserted.data);
      });
  };
  return (
    <div className="fadeIn">
      <h2 className="text-left ml-3 text-lg text-primary font-bold">
        Add A Tool
      </h2>
      <div className="flex justify-center">
        <form
          className="form card w-full max-w-md sm:max-w-lg lg:max-w-lg shadow-2xl glass mx-3 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-5">
            <h2 className="text-2xl font-bold text-primary"> Add A New Tool</h2>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-primary">Name</span>
              </label>
              <input
                className="input input-bordered text-secondary font-semibold"
                type="text"
                placeholder="Tool Name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-primary">Image URL</span>
              </label>
              <input
                className="input input-bordered text-secondary font-semibold"
                type="text"
                placeholder="Image URL"
                {...register("img", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text text-primary">Description</span>
              </label>
              <textarea
                className="input input-bordered text-secondary font-semibold h-20"
                placeholder="Description"
                {...register("description", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-primary">
                    Price <small>(USD)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-secondary font-semibold"
                  placeholder="Tool Price"
                  type="number"
                  {...register("price", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-primary">
                    Min Quantity <small>(Pcs)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-secondary font-semibold"
                  placeholder="Minimum Quantity"
                  type="number"
                  {...register("minOrderQuantity", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-primary">
                    Available Quantity <small>(Pcs)</small>
                  </span>
                </label>
                <input
                  className="input input-bordered text-secondary font-semibold"
                  placeholder="Available Quantity"
                  type="number"
                  {...register("availableQuantity", { required: true })}
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary font-bold" type="submit">
                Add Tool
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddATool;
