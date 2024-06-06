import { ShimmerPostDetails } from "react-shimmer-effects";

const DetailsLoader = () => {
  return (
    <>
      <div className=" mt-20 px-32 flex justify-center items-center">
        <ShimmerPostDetails  card cta variant="SIMPLE" />
      </div>
    </>
  );
};

export default DetailsLoader;
