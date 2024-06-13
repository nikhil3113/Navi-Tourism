import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";
import { useDarkMode } from "../../DarkModeContext";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ShimmerPostItem } from "react-shimmer-effects";

const Location = () => {
  const { id } = useParams();
  const token = localStorage.getItem("LocalPreference");
  const [location, setLocation] = useState([]);
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [likedLocations, setLikedLocations] = useState(0);
  // const[hasLiked, setHashLiked] = useState(false)
  // const navigate = useNavigate();
  useEffect(() => {
    axios
      // .get(`https://navi-tourism-backend.vercel.app/location/${id}`)
      .get(`https://navi-tourism-backend.vercel.app/location/${id}`)
      .then((response) => {
        setLocation(response.data.locations);
        const storedLikes = localStorage.getItem("likedLocations");
        if (storedLikes) {
          setLikedLocations(JSON.parse(storedLikes));
        }
        setLoading(false);
        // console.log(response.data.locatoins);
       
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleLikes = async (locationId) => {
    // Optimistically update the UI
    setLocation((prevLocations) =>
      prevLocations.map((loc) =>
        loc.id === locationId ? { ...loc, likes: loc.likes + 1 } : loc
      )
    );
    setLikedLocations((prev) => {
      const updatedLikes = { ...prev, [locationId]: true };
      localStorage.setItem("likedLocations", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  
    try {
      await axios.put(`https://navi-tourism-backend.vercel.app/locationLikes/${locationId}`);
    } catch (error) {
      // Revert the UI update if the request fails
      setLocation((prevLocations) =>
        prevLocations.map((loc) =>
          loc.id === locationId ? { ...loc, likes: loc.likes - 1 } : loc
        )
      );
      setLikedLocations((prev) => {
        const updatedLikes = { ...prev, [locationId]: false };
        localStorage.setItem("likedLocations", JSON.stringify(updatedLikes));
        return updatedLikes;
      });
      console.log(error);
    }
  };
  
  const handleUnlike = async (locationId) => {
    // Optimistically update the UI
    setLocation((prevLocations) =>
      prevLocations.map((loc) =>
        loc.id === locationId ? { ...loc, likes: loc.likes - 1 } : loc
      )
    );
    setLikedLocations((prev) => {
      const updatedLikes = { ...prev, [locationId]: false };
      localStorage.setItem("likedLocations", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  
    try {
      await axios.put(`https://navi-tourism-backend.vercel.app/locationUnlike/${locationId}`);
    } catch (error) {
      // Revert the UI update if the request fails
      setLocation((prevLocations) =>
        prevLocations.map((loc) =>
          loc.id === locationId ? { ...loc, likes: loc.likes + 1 } : loc
        )
      );
      setLikedLocations((prev) => {
        const updatedLikes = { ...prev, [locationId]: true };
        localStorage.setItem("likedLocations", JSON.stringify(updatedLikes));
        return updatedLikes;
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div className="dark:bg-gray-800 min-h-screen">
          <NavBar />
          <div className="text-center text-5xl dark:text-white font-extrabold text-gray-800 mb-10 mt-10">
            <h1>Location&apos;s To Visit</h1>
          </div>
          {token ? (
            <div className="flex justify-end items-start xl:mr-44 md:mr-44 mr-20">
              <Link to={`/location/add/${id}`} className="flex">
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
                    <div key={index}>
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
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : location && location.length > 0 ? (
                location.map((item) => (
                  <div key={item.id}>
                    <Card
                      name={item.name}
                      description={item.description}
                      buttonName="Visit"
                      route={`/locationDetail/${item.id}`}
                      updateRoute={`/location/update/${item.id}`}
                      DeleteButtonVisiblity={"hidden"}
                      likes={item.likes}
                      likesVisiblity="visible"
                      handleLike={() => handleLikes(item.id)}
                      handleUnlike={() => handleUnlike(item.id)}
                      isLiked={likedLocations[item.id]}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-4xl ml-20 font-bold dark:text-white mt-20">
                  No Location found :(
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
