import Form from "../../components/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LocationForm from "../../components/LocationForm";

const UpdateLocation = () => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  // const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (formData) => {
    axios
      .put(`https://navi-tourism-backend.vercel.app/location/update/${id}`, formData)
      .then(() => {
        alert("data updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <LocationForm tag="update" handleSubmit={handleSubmit} />
    </>
  );
};

export default UpdateLocation;
