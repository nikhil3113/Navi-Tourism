import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import { useDarkMode } from "../DarkModeContext";
import axios from "axios";

const Home = () => {
  const token = localStorage.getItem("LocalPreference");
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("LocalPreference");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div className="dark:bg-gray-800 h-full ">
          <NavBar />
          <div className="flex flex-col my-8">
            <div className="flex flex-col justify-center items-center mb-20">
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

            <div className="flex xl:flex-row md:flex-row flex-col justify-evenly items-center dark:text-white  ">
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

            <div className="flex xl:flex-row md:flex-row flex-col justify-evenly items-center mt-20 dark:text-white">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
