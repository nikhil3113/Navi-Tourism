import { ShimmerPostItem } from "react-shimmer-effects";


const CardLoader = () => {
  return (
    <>
      <div className="gap-10 mt-10 ">
        <div className="sm:w-96 w-80">
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
    </>
  );
};

export default CardLoader;
