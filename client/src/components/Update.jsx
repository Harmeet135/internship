import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatedata } from "./ContextProvider";
import FileBase from "react-file-base64";

const Update = () => {
  const { updata, setUPdata } = useContext(updatedata);
  let navigate = useNavigate();
  const [inpval, setInpval] = useState({
    name: "",
    price: "",
    details: "",
    selectedFile: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { id } = useParams();

  const getInput = async () => {
    const res = await fetch(`https://internhsip.onrender.com/getdata/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data.id);

    if (res.status === 400 || res.status === 404 || !data) {
      console.log("error");
    } else {
      setInpval(data);
      console.log(data.id, "get data is here");
    }
  };

  useEffect(() => {
    getInput();
  }, []);

  const updated = async (e) => {
    e.preventDefault();
    const { name, price, details, selectedFile } = inpval;
    const res2 = await fetch(`https://internhsip.onrender.com/update/${id}`, {
      method: "PATCH",
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
    const data2 = await res2.json();
    console.log(data2, "data is here");

    if (res2.status === 400 || res2.status === 404 || !data2) {
      alert("Please fill all the fields");
    } else {
      setUPdata(data2);
      navigate("/");
    }
  };

  const handleImageUpload = (base64) => {
    setInpval((prevState) => ({
      ...prevState,
      selectedFile: base64,
    }));
  };

  return (
    <div className="container">
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Details
            </label>
            <input
              type="text"
              value={inpval.details}
              onChange={setdata}
              name="details"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Price
            </label>
            <input
              type="number"
              value={inpval.price}
              onChange={setdata}
              name="price"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Image
            </label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => handleImageUpload(base64)}
            />
          </div>
          <button onClick={updated} type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
