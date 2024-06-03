import Form from "../../components/Form";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const UpdateCity = () => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  // const navigate = useNavigate();
  const {id} = useParams();


  const handleSubmit = (formData) => {
    axios
      .put(`http://localhost:5000/update/${id}`, formData)
      .then(() => {
        alert("data updated")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
        <Form tag="update" handleSubmit={handleSubmit} />
    </>
  );
};

export default UpdateCity;
