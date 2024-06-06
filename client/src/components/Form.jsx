import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ShimmerBadge, ShimmerButton } from "react-shimmer-effects";

const Form = ({ handleSubmit, tag = "", initialData = {} }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("LocalPreference");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    axios
      .get(`https://navi-tourism-backend.vercel.app/${id}`)
      .then((response) => {
        setName(response.data.city.name);
        setDescription(response.data.city.description);
        // console.log(response.data.city.name)
        setLoading(false);
      })
      .catch((error) => {
        // alert(error.response);
        console.log(error);
        setLoading(false);
      });
  }, [id, navigate, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, description });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-32">
        <h1 className="text-4xl font-bold mb-5">
          {tag == "add" ? "Add" : "Update"} City
        </h1>
        <form
          onSubmit={onSubmit}
          className="border-slate-500 border-2 w-[80%] sm:w-2/6 p-5 rounded-lg"
        >
          <div className="flex flex-col my-5">
            {loading ? (
              <>
                <ShimmerBadge width={450} />
              </>
            ) : (
              <>
                <label htmlFor="name" className="font-semibold mb-2">
                  Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700"
                />
              </>
            )}
          </div>

          <div className="flex flex-col my-5">
            {loading ? (
              <>
                <ShimmerBadge width={450} height={500} />
              </>
            ) : (
              <>
                <label htmlFor="description" className="font-semibold mb-2">
                  Description
                </label>
                <textarea
                  required
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  cols={40}
                  className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700"
                ></textarea>
              </>
            )}
          </div>
          {loading ? (
            <>
              <ShimmerButton size="lg" />
            </>
          ) : (
            <button className="bg-blue-700 p-2 rounded-lg text-white font-semibold w-full hover:opacity-80 cursor-pointer">
              {tag == "add" ? "Add" : "Update"}
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;
