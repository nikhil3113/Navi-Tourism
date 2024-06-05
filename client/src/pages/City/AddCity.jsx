import { useEffect, useState } from "react";
import Form from "../../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCity = () => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("LocalPreference")){
      navigate("/");
    }
  })

  const handleSubmit = (formData) => {
    axios
      .post("https://navi-tourism-backend.vercel.app/add", formData)
      .then(() => {
        alert("Added City");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form tag="add" handleSubmit={handleSubmit} />
    </>
  );
};

export default AddCity;
