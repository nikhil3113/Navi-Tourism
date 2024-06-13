import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import { useDarkMode } from "../DarkModeContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { ShimmerPostItem } from "react-shimmer-effects";
import Card from "../components/Card";

const Home = () => {
  const token = localStorage.getItem("LocalPreference");
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedLocations, setLikedLocations] = useState(0);

  useEffect(() => {
    axios
      .get("https://navi-tourism-backend.vercel.app/location/sorted")
      .then((response) => {
        // console.log(response.data.locations);
        setLocation(response.data.locations);
        
        const storedLikes = localStorage.getItem("likedLocations");
        if (storedLikes) {
          setLikedLocations(JSON.parse(storedLikes));
        }
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("LocalPreference");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className={`${darkMode && "dark"} flex flex-col min-h-screen`}>
        <div className="dark:bg-gray-800 flex flex-col flex-grow">
          <NavBar />
          <div className="flex flex-col my-8">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-6xl font-extrabold text-center dark:text-white">
                Navi <br /> Tourism
              </h1>
              <div className="">
                <Link to="/city">
                  <button className="mt-10 mx-5 inline-flex items-center px-3 py-2 text-[16px] font-semibold text-center dark:text-black text-white bg-blue-700 rounded-lg hover:bg-blue-800 hover:dark:bg-gray-500 focus:ring-4 focus:outline-none  dark:bg-[#b5b9be]">
                    Explore
                  </button>
                </Link>

                {token ? (
                  <>
                    <button
                      className=" cursor-pointer mt-10 mx-5 inline-flex items-center px-3 py-2 text-[16px] font-semibold text-center dark:text-black text-white bg-blue-700 rounded-lg hover:bg-blue-800 hover:dark:bg-gray-500 focus:ring-4 focus:outline-none  dark:bg-[#b5b9be]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/admin/login">
                    <button className=" cursor-pointer mt-10 mx-5 inline-flex items-center px-3 py-2 text-[16px] font-semibold text-center dark:text-black text-white bg-blue-700 rounded-lg hover:bg-blue-800 hover:dark:bg-gray-500 focus:ring-4 focus:outline-none  dark:bg-[#b5b9be]">
                      Admin Login
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div className="flex xl:flex-row md:flex-row flex-col justify-evenly items-center dark:text-white mt-10 ">
              <div className="sm:w-[40%] w-[80%] sm:mb-0 mb-10">
                <h1 className="text-4xl font-bold mb-5">About Us</h1>
                <p className="text-lg">
                  Welcome to our travel exploration site, your ultimate guide to
                  discovering the hidden gems and vibrant cities around the
                  world. Whether you&apos;re planning your next adventure or
                  seeking inspiration for your bucket list, we provide detailed
                  insights, tips, and recommendations to make your journey
                  unforgettable. Dive into our comprehensive city guides,
                  uncover the best local attractions, and get ready to
                  experience travel like never before. Join us in exploring new
                  destinations, cultures, and experiences, all from the comfort
                  of your home or on the go. Let&apos;s make your travel dreams
                  a reality!
                </p>
              </div>
              <div>
                <img src={t2} alt="icon" />
              </div>
            </div>

            <div className="flex-col justify-center items-center mt-10  bg-gray-100 dark:bg-transparent">
              <div className="py-20">
                <h1 className="text-4xl font-bold mb-5 text-center dark:text-white text-gray-800">
                  Top Location&apos;s
                </h1>
                <div className="flex flex-col justify-end  items-center ">
                  <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 px-3 mb-5">
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
                      location.slice(0, 3).map((item) => (
                        <div key={item.id}>
                          <Card
                            name={item.name}
                            description={item.description}
                            route={`/locationDetail/${item.id}`}
                            buttonName="Visit"
                            updateRoute={`/city/update/${item.id}`}
                            handleDelete={""}
                            likes={item.likes}
                            handleLike={() => handleLikes(item.id)}
                            handleUnlike={() => handleUnlike(item.id)}
                            isLiked={likedLocations[item.id]}
                          />
                        </div>
                      ))
                    ) : (
                      ""
                    )}
                  </div>
                  <Link to="/location/top">
                    <button className=" cursor-pointer mt-5 mx-5 inline-flex items-center px-3 py-2 text-[16px] font-semibold text-center dark:text-black text-white bg-blue-700 rounded-lg hover:bg-blue-800 hover:dark:bg-gray-500 focus:ring-4 focus:outline-none  dark:bg-[#b5b9be]">
                      Explore &gt;
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex xl:flex-row md:flex-row flex-col justify-evenly items-center mt-20 dark:text-white">
              <div>
                <img src={t1} alt="" className="max-sm:hidden" />
              </div>
              <div className="sm:w-[40%] w-[80%] sm:mb-0 mb-10">
                <h1 className="text-4xl font-bold mb-5">Key Feature</h1>
                <ul className="text-lg">
                  <li className="my-5">
                    <span className="font-bold">
                      {" "}
                      Comprehensive Coverage of Navi Mumbai:
                    </span>{" "}
                    Explore nearly every place in Navi Mumbai, with detailed
                    information on a wide range of attractions, from popular
                    landmarks to hidden gems.
                  </li>
                  <li className="my-5">
                    <span className="font-bold"> Google Maps Integration:</span>{" "}
                    Easily locate and navigate to all listed destinations with
                    integrated Google Maps, providing a seamless travel planning
                    experience.
                  </li>
                  <li className="my-5">
                    <span className="font-bold"> Summary Description:</span> Get
                    concise and informative descriptions for each location,
                    giving you a quick overview of what to expect and helping
                    you decide which places to visit.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex xl:flex-row md:flex-row flex-col justify-evenly items-center mt-20 dark:text-white ">
              <div className="sm:w-[40%] w-[80%] sm:mb-0 mb-10">
                <h1 className="text-4xl font-bold mb-5">Our Mission</h1>
                <p className="text-lg">
                  Our mission is to promote tourism in Navi Mumbai by making it
                  easy for travelers to discover and explore the city&apos;s
                  diverse attractions. We aim to support local communities and
                  businesses by highlighting the rich cultural, historical, and
                  natural sites of Navi Mumbai, encouraging more visitors to
                  experience the vibrant life of this city. Through our
                  platform, we strive to provide accessible and comprehensive
                  information, helping both locals and tourists to navigate and
                  appreciate all that Navi Mumbai has to offer.
                </p>
              </div>
              <div className="relative right-5">
                <img src={t3} alt="icon3" />
              </div>
            </div>

            <div className="flex xl:flex-row md:flex-row flex-col justify-evenly sm:items-end mt-20  ">
              <div className="text-xl text-gray-800 font-semibold mb-3 dark:text-white relative top-2">
                <Link to="https://nikchavan.netlify.app" target="_blank">
                  &gt; PortFolio
                </Link>
              </div>
              <div className=" text-xl dark:text-white ">
                <p>&copy; Nikhil Chavan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
