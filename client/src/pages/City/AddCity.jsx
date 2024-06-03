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
      .post("http://localhost:5000/add", formData)
      .then(() => {
        navigate("/");
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
