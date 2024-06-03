import { useEffect, useState } from "react";
import Form from "../../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationForm from "../../components/LocationForm";

const AddLocation = () => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("LocalPreference")) {
      navigate("/");
    }
  });

  const handleSubmit = (formData) => {
    axios
      .post("http://localhost:5000/location/add", formData)
      .then(() => {
        alert("Added Location");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <LocationForm tag="add" handleSubmit={handleSubmit} />
    </>
  );
};

export default AddLocation;
