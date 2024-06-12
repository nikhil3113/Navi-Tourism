import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";
import { useDarkMode } from "../../DarkModeContext";
import { ShimmerPostItem } from "react-shimmer-effects";

const TopLocation = () => {
  const [location, setLocation] = useState([]);
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/location/sorted")
      .then((response) => {
        // console.log(response.data.locations);
        setLocation(response.data.locations);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className={`${darkMode && "dark"}`}>
        <div className="dark:bg-gray-800 min-h-screen">
          <NavBar />
          <div className="text-center text-5xl dark:text-white font-extrabold text-gray-800 mb-10 mt-10">
            <h1> Top Location&apos;s</h1>
        <h1 className="mt-3"> In Navi Mumbai</h1>
          </div>

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
                      likesVisiblity={"visible"}
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

export default TopLocation;
