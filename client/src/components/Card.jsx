import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";


const Card = ({
  name,
  description,
  route,
  buttonName,
  updateRoute,
  handleDelete,
  DeleteButtonVisiblity,
  likes,
  likesVisiblity,
  isLiked,
  handleLike,
  handleUnlike,
  buttonVisiblity
}) => {
  const token = localStorage.getItem("LocalPreference");

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      <div className="mt-5">
        <div className="max-w-sm h-full bg-gray-800  dark:bg-[#e5e7eb] border border-gray-800 rounded-lg shadow ">
          {/* dark:bg-gray-800 dark:border-gray-700 */}
          <div className="p-5 h-full flex flex-col justify-between">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-[#1f2937]">
                {truncateText(name, 3)}
              </h5>
            </a>
            <p
              className="mb-3 text-white dark:text-[#374151] font-semibold text-[17px]"
              style={{ maxHeight: "4rem" }}
            >
              {truncateText(description, 21)}
            </p>
            <div className="flex justify-between items-end">
              <Link to={route}>
                <button className={` mt-10 inline-flex items-center px-3 py-2 text-[16px] font-semibold text-center dark:text-black text-white bg-blue-700 rounded-lg hover:bg-blue-800 hover:dark:bg-gray-500 focus:ring-4 focus:outline-none  dark:bg-[#b5b9be] ${buttonVisiblity} `}>
                  {buttonName}
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </Link>
              <div
                className={`flex justify-center items-center text-xl ${likesVisiblity} `}
              >
                {/* {isLiked ? (
                  <FaHeart className="mr-2 text-red-500 cursor-pointer" onClick={handleUnlike} />
                ) : (
                  <CiHeart className="mr-2 text-red-600 text-2xl cursor-pointer font-extrabold" onClick={handleLike} />
                )} */}

                <FaHeart
                  className={`mt-1 mr-1 cursor-pointer ${
                    isLiked
                      ? "transition ease-in-out delay-150  scale-110 text-red-500 dark:text-red-500 duration-300"
                      : "transition ease-out delay-150 text-white dark:text-[#b5b9be] "
                  }`}
                  onClick={isLiked? handleUnlike: handleLike}
                />

                <p className="font-bold text-xl dark:text-gray-800 text-white">{likes}</p>
              </div>

              {token ? (
                <div className="flex">
                  <Link onClick={handleDelete}>
                    <MdOutlineDelete
                      className={`text-[28px] text-red-500 dark:text-red-800 ${DeleteButtonVisiblity}`}
                    />
                  </Link>
                  <Link to={updateRoute} className="mx-5">
                    <FaRegEdit className="text-[26px] text-green-400 dark:text-green-800" />
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
