import { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../DarkModeContext";
import { MdOutlineAddToPhotos } from "react-icons/md";

const City = () => {
  const [city, setCity] = useState([]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const token = localStorage.getItem("LocalPreference");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then((response) => {
        setCity(response.data.city);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert("An Error occured");
        console.log(error);
      });
  };

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div className=" dark:bg-gray-800 h-screen xl:h-screen md:h-screen">
          {/* h-full */}
          <NavBar />
          {token ? (
            <div className="flex justify-end items-start xl:mr-44 md:mr-44 mr-20">
              <Link to="/city/add" className="flex">
                <span className="text-3xl mr-2  dark:text-white font-extrabold">
                  {" "}
                  Add{" "}
                </span>
                <MdOutlineAddToPhotos className="text-4xl text-red-500 dark:text-red-700" />
              </Link>
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-center items-center">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 px-3">
              {city && city.length > 0 ? (
                city.map((item) => (
                  <div key={item.id}>
                    <Card
                      name={item.name}
                      description={item.description}
                      route={`/location/${item.id}`}
                      buttonName="Visit"
                      updateRoute={`/city/update/${item.id}`}
                      handleDelete={""}
                    />
                  </div>
                ))
              ) : (
                <p>No cities found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default City;
