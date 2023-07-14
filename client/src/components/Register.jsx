import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "./ContextProvider";
import validator from "email-validator";
import FileBase from "react-file-base64";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    price: "",
    details: "",
    selectedFile: "", 
  });

  const [error, setError] = useState(""); 

  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const addInput = async (e) => {
    e.preventDefault();
    const { name, price, details, selectedFile } = inpval;

    if (price <= 0) {
      setError("Price must be a positive number");
      return;
    }

    try {
      const res = await fetch("https://internhsip.onrender.com/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          details,
          selectedFile,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error registering user");
      }

      const data = await res.json();
      setUdata(data);
      navigate("/");
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleImageUpload = (base64) => {
    setInpval((prevState) => ({
      ...prevState,
      selectedFile: base64,
    }));
  };
  console.log(inpval);

  return (
    <div className="container">
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Price
            </label>
            <input
              type="number"
              value={inpval.price}
              onChange={setdata}
              name="price"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Details
            </label>
            <textarea
              value={inpval.details}
              onChange={setdata}
              name="details"
              class="form-control"
              id="exampleInputPassword1"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Image
            </label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => handleImageUpload(base64)}
            />
          </div>

          {error && <p>{error}</p>} 

          <button onClick={addInput} type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
