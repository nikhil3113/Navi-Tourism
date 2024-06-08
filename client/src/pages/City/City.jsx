import { useEffect, useState } from "react";
import Card from "../../components/Card";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../DarkModeContext";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ShimmerPostItem } from "react-shimmer-effects";

const City = () => {
  const [city, setCity] = useState([]);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cityCount, setCityCount] = useState(0);

  const token = localStorage.getItem("LocalPreference");
  useEffect(() => {
    axios
      .get(`https://navi-tourism-backend.vercel.app/`)
      // .get('http://localhost:5000/')
      .then((response) => {
        setCity(response.data.city);
        setCityCount(response.data.city.length);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .get(`https://navi-tourism-backend.vercel.app/city/${id}/locationCount`)
      .then((response) => {
        if (response.data.count === 0) {
          axios
            .delete(`https://navi-tourism-backend.vercel.app/delete/${id}`)
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              alert("error occured");
              console.log(error);
            });
        } else {
          alert("Please delete all location first");
          // console.log("Please delete all location first")
        }
      })
      .catch((error) => {
        // alert("Error occured while checking location");
        console.log(error);
      });
  };

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div className=" dark:bg-gray-800 min-h-screen">
          {/* h-full */}
          <NavBar />
          <div className="text-center text-5xl dark:text-white font-extrabold text-gray-800">
            <h1>City&apos;s</h1>
          </div>
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
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 px-3 mb-20">
              {loading ? (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    // <CardLoader key={index} />
                    <>
                      <div className="gap-10 mt-10 ">
                        <div className=" w-[350px]">
                          <ShimmerPostItem
                            card
                            title
                            cta
                            imageType="thumbnail"
                            imageWidth={200}
                            imageHeight={5}
                            contentCenter
                            key={index}
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : city && city.length > 0 ? (
                city.map((item) => (
                  <div key={item.id}>
                    <Card
                      name={item.name}
                      description={item.description}
                      route={`/location/${item.id}`}
                      buttonName="Visit"
                      updateRoute={`/city/update/${item.id}`}
                      handleDelete={() => handleDelete(item.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="mt-20 text-4xl dark:text-white text-gray-800">
                  <p>No cities found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default City;
