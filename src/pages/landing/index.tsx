import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layouts/layout";
import BookShow from "../../layouts/bookShow";
import BookCarousel from "../../components/carousels/bookCarousel";
import Pagination from "../../components/pagination";
import BookCard from "../../components/cards/bookCard";
import { getAllBooks } from "../../actions/bookActions";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

type Review = {
  user: string;
  comment: string;
  rating: number;
  _id: string;
  date: string;
};

export type BookData = {
  _id: string;
  title: string;
  author: {
    name: string;
  };
  ratings: number;
  images: string;
};

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const { loading, totalPages, books, error } = useSelector(
    (state: RootState) => state.books
  );
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getAllBooks() as any);
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optionally fetch new data based on page
  };
  const bookslide = [
    {
      title: "One Dark Window Exclusive Edition",
      author: "Rachel Gilling",
      imageUrl:
        "https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&product=path%5B/pimages/9781510782693_p0_v9%5D&call=url%5Bfile:common/decodeProduct.chain%5D",
      rating: "⭐⭐⭐",
    },
    {
      title: "Another Book Title",
      author: "Author Name",
      imageUrl: "https://via.placeholder.com/300x400",
      rating: "⭐⭐⭐⭐",
    },
    // Add more book objects as needed
  ];

  return (
    <Layout>
      <div>
        <div className="max-w-[1440px] m-auto">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <div className="flex items-start flex-wrap gap-5 mt-[50px]">
              {books?.map((bookData: BookData) => (
                <BookCard
                  id={bookData._id}
                  key={bookData._id}
                  imageUrl={bookData.images}
                  title={bookData.title}
                  author={bookData.author?.name || "Unknown Author"}
                  rating={bookData.ratings}
                />
              ))}
            </div>
          )}
          <BookShow>
            <BookCarousel books={bookslide} />;
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </BookShow>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
