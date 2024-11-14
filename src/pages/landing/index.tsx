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
  };


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
            <BookCarousel books={books as any } />;
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
