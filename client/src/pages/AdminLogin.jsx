import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom";


const AdminLogin = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleLogin = async(e) =>{
    e.preventDefault();

    try {
        const response = await axios.post(`https://navi-tourism-backend.vercel.app/login`, {
            email,
            password
        })
        localStorage.setItem("LocalPreference", response.data.token)
        console.log(response.data)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
   
   }
  return (
    <>
    <div className="flex flex-col justify-center items-center mt-32">
      <h1 className="text-4xl font-bold mb-5">Login</h1>
      <form onSubmit={handleLogin} className="border-slate-500 border-2 w-2/5 xl:w-2/6 p-5 rounded-lg">
        <div className="flex flex-col my-5">
          <label htmlFor="name" className="font-semibold mb-2">Email</label>
          <input type="text" placeholder="Enter Name" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700" />
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="description" className="font-semibold mb-2">Description</label>
          <input type="password" placeholder="Enter Name" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 bg-slate-200 p-2 rounded-lg focus:outline focus:ring-blue-700 focus:border-blue-700" />
        </div>
        <button className="bg-blue-700 p-2 rounded-lg text-white font-semibold w-full hover:opacity-80">Submit</button>
      </form>
    </div>
  </>
  )
}

export default AdminLogin