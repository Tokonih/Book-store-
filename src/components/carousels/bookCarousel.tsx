import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Book {
  title: string;
  author: string;
  imageUrl: string;
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
        {books.map((book, i) => (
          <div key={i}>
            <div className="w-[186px] min-h-[1px] cursor-pointer padding-[0.7275px]">
              <figure className="h-[243px] w-full">
                <img
                  src={book.imageUrl}
                  className="h-full w-full object-contain"
                  alt={book.title}
                />
              </figure>
              <div className="min-h-[6rem]">
                <div className="font-lato text-[0.53072rem] font-semibold leading-[1.25] tracking-[.57px] text-center text-black mb-1 pt-2 overflow-hidden">
                  <span className="line-clamp-2">{book.title}</span>
                </div>

                <div className="text-center mb-[3px] overflow-hidden text-ellipsis line-1.15">
                  <span>{book.author}</span>
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
