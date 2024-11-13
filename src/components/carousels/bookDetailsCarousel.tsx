import React, { useState, FC } from "react";
import { RxChevronUp } from "react-icons/rx";
import { RxChevronDown } from "react-icons/rx";

interface CarouselProps {
  images: string;
}

const BookDetailsCarousel: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // const handleUpClick = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : images.length - 1
  //   );
  // };

  // const handleDownClick = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex < images.length - 1 ? prevIndex + 1 : 0
  //   );
  // };

  return (
    <div className="flex">
      {/* <div className="flex flex-col items-center space-y-2">
        <button
          onClick={handleUpClick}
          className="text-xl text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Previous image"
        >
          <RxChevronUp />
        </button>
        {images && images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 cursor-pointer rounded-lg transition-transform duration-200 ${
              index === currentIndex
                ? "border-2 border-blue-500 scale-105"
                : "border border-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
        <button
          onClick={handleDownClick}
          className="text-xl text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Next image"
        >
          <RxChevronDown />
        </button>
      </div> */}

      <div className="p-[20px] max-h-[31rem] w-[85%]">
        <img
          src={images}
          alt={`Main Image ${currentIndex + 1}`}
          className="w-full h-[100%] max-h-[100%] object-contain "
        />
      </div>
    </div>
  );
};

export default BookDetailsCarousel;
