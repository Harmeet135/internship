import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { NavLink, useParams } from "react-router-dom";
import pfp from "./assests/cat1.webp";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Details = () => {
  let Navigate = useNavigate();
  const { id } = useParams();

  const [getdata, setgetData] = useState([]);

  const getInput = async (e) => {
    const res = await fetch(
      `https://internhsip.onrender.com/getdata/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data.id);

    if (res.status === 400 || res.status === 404 || !data) {
      console.log("error");
    } else {
      setgetData(data);
      console.log(data.id, "get data is here");
    }
  };

  useEffect(() => {
    getInput();
  }, []);

  const deleteData = async (id) => {
    const deleted = await fetch(
      `https://internhsip.onrender.com/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedata = await deleted.json();
    if (deletedata) {
      console.log("deleted");
      Navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>{getdata.name}'s info </h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn d-flex justify-content-end">
            <NavLink to={`/update/${getdata._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteData(getdata._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src={getdata.selectedFile}
                style={{ width: 60, height: 60, borderRadius: 100 }}
                alt="profile"
              />
              <h3 className="mt-3">
                Name: <span>{getdata.name}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Details: <span>{getdata.details}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                {/* <PhoneAndroidIcon /> */}
                price: <span>{getdata.price}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
