import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useDarkMode } from "../../DarkModeContext";
import { MdModeEditOutline } from "react-icons/md";


const LocationDetail = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exactLocation, setExactLocation] = useState("");
  const [distFromStn, setDistFromStn] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const [latitude, setLatitude] = useState("");
  const [iframe, setIframe] = useState("");

  const { darkMode } = useDarkMode();
  const token = localStorage.getItem("LocalPreference");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/locationDetails/${id}`)
      .then((response) => {
        // console.log(response.data)
        setName(response.data.location.name);
        setDescription(response.data.location.description);
        setExactLocation(response.data.location.exactLocation);
        setDistFromStn(response.data.location.distFromStn);
        // setLongitude(response.data.location.longitude);
        // setLatitude(response.data.location.latitude);
        setIframe(response.data.location.iframe);
        console.log(response.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="dark:bg-gray-800 h-full">
        <NavBar />
        {token ? (
          <div className="flex justify-end items-start xl:mr-44 md:mr-44 mr-10">
            <Link to={`/location/update/${id}`} className="flex">
              <span className="text-3xl dark:text-white font-semibold mr-2">Update</span><MdModeEditOutline className="text-4xl text-green-300 dark:text-green-500" />
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="text-center dark:text-white mt-[40px] mb-[40px]">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{name}</h1>
        </div>

        <div className=" flex flex-col justify-center sm:items-center">
          <div className="flex flex-col xl:flex-row justify-center items-center mt-10 sm:px-8 px-5 py-10 dark:text-white bg-gradient-to-r from-gray-50 to-gray-200 my-5 xl:w-11/12 md:w-11/12 rounded-lg xl:dark:shadow-none  dark:shadow-lg dark:from-gray-700 dark:to-gray-800 ">
            <div className="max-w-2xl sm:mr-20">
              <div className=" my-5">
                <p className="text-xl ">{description}</p>
              </div>
              <div className=" my-5">
                <p className="text-xl ">{exactLocation}</p>
              </div>
              <div className=" my-5">
                <p className="text-xl ">
                  Distance From station{" "}
                  <span className="font-bold">{distFromStn}KM</span>
                </p>
              </div>
              {/* <div className=" my-5">
                <p className="text-xl ">{longitude}</p>
                <p className="text-xl ">{latitude}</p>
              </div> */}
            </div>

            <div className="w-2/5 sm:w-full flex justify-center items-center">
              <iframe
                src={iframe}
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
