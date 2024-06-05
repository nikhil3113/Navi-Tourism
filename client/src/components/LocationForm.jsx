import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

const LocationForm = ({ handleSubmit, tag = "", initialData={} }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [exactLocation, setExactLocation] = useState(initialData.exactLocation || "");
  const[distFromStn, setDistFromStn] = useState(initialData.distFromStn || "");
  const[iframe, setIframe] = useState(initialData.iframe || "");
  // const[cityId, setCityId] = useState(initialData.cityId || "");


  const navigate = useNavigate();
  const {id} = useParams();

  const token  = localStorage.getItem("LocalPreference")
  useEffect(() => {
    if(!token){
      navigate("/");
    }
    axios.get(`https://navi-tourism-backend.vercel.app/locationDetails/${id}`)
          .then((response) =>{
            setName(response.data.location.name)
            setDescription(response.data.location.description)
            setExactLocation(response.data.location.exactLocation)
            setDistFromStn(response.data.location.distFromStn)
            setIframe(response.data.location.iframe)
            // console.log(response.data)
          })
          .catch((error)=>{
            // alert(error.response);
            console.log(error);
          })
  }, [id, navigate, token])


  const onSubmit = (e) =>{
    e.preventDefault();
    handleSubmit({name, description, exactLocation, cityId:id, distFromStn, iframe})
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-4xl font-bold mb-5">{tag == "add"? "Add" : "Update"} Location</h1>
        <form onSubmit={onSubmit} className="border-slate-500 border-2 w-2/5 xl:w-2/6 p-5 rounded-lg">
          <div className="flex flex-col my-5">
            <label htmlFor="name" className="font-semibold mb-2">Name</label>
            <input required type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700" />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="description" className="font-semibold mb-2">Description</label>
            <textarea required name="description" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} cols={40} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700"></textarea>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="description" className="font-semibold mb-2">Exact Location</label>
            <textarea required name="description" placeholder="Enter Description" value={exactLocation} onChange={(e) => setExactLocation(e.target.value)} rows={4} cols={40} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700"></textarea>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="iframe" className="font-semibold mb-2">Google Map Iframe (src code)</label>
            <textarea required name="iframe" placeholder="Only Enter Src from iframe (embeded link)" value={iframe} onChange={(e) => setIframe(e.target.value)} rows={4} cols={40} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700"></textarea>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="distance" className="font-semibold mb-2">Distance From Station (KM)</label>
            <input required type="number" placeholder="Enter Distance" value={distFromStn} onChange={(e) => setDistFromStn(e.target.value)} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700" />
          </div>
          
          <button className="bg-blue-700 p-2 rounded-lg text-white font-semibold w-full hover:opacity-80 cursor-pointer">{tag == "add"? "Add" : "Update"}</button>
        </form>
      </div>
    </>
  );
};

export default LocationForm;
