import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  imageUrl: string;
  title: string;
  author: string;
  rating: number;
  id:string
}

const BookCard: React.FC<BookCardProps> = ({
  imageUrl,
  title,
  author,
  rating,
  id
}) => {
  return (
    <Link to={`/details/${id}`} className="w-[186px] min-h-[1px] cursor-pointer padding-[0.7275px] text-black nounderline">
      <figure className="h-[243px] w-full">
        <img
          src={imageUrl}
          className="h-full w-full object-contain"
          alt={title}
        />
      </figure>
      <div className="min-h-[6rem]">
        <div className="font-lato text-[1.3072rem] font-semibold leading-[1.25] tracking-[.57px] text-center text-black nounderline mb-1 pt-2 overflow-hidden">
          <span className="line-clamp-2 nounderline">{title}</span>
        </div>

        <div className="text-center mb-[3px] overflow-hidden nounderline text-ellipsis line-1.15">
          <span className="nounderline">{author}</span>
        </div>
        <div className="flex items-center justify-center">
          {Array.from({ length: rating }).map((_, index) => (
            <span key={index}>⭐</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
