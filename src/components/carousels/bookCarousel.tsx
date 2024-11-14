import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Book {
  title: string;
  author: string;
  images: string;
  rating: string; 
}

interface BookCarouselProps {
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const settings: Settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (index: number) => {
      console.log(`Slider Changed to: ${index + 1}`);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books && books.map((book, i) => (
          <div key={i}>
            <div className="w-[186px] min-h-[1px] cursor-pointer padding-[0.7275px]">
              <figure className="h-[243px] w-full">
                <img
                  src={book.images }
                  className="h-full w-full object-contain"
                  alt={book.title}
                />
              </figure>
              <div className="min-h-[6rem]">
                <div className="font-[sans-sarif] text-[15px] font-semibold leading-[1.25] tracking-[.57px] text-center text-black mb-1 pt-2 overflow-hidden">
                  <span className="line-clamp-2">{book.title}</span>
                </div>

                
                <div className="flex items-center justify-center">{book.rating}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookCarousel;
