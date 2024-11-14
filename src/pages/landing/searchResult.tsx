import React, { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import hero from "../../asset/images/home-hero.jpg";
import BookShow from "../../layouts/bookShow";
import BookCarousel from "../../components/carousels/bookCarousel";
import Pagination from "../../components/pagination";
import BookCard from "../../components/cards/bookCard";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResult: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Opti
  };


  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      fetch(
        `${apiUrl}book/books?sortBy=title&sortOrder=asc&title=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data.books);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch search results.");
          setLoading(false);
        });
    }
  }, [searchTerm]);

  return (
    <Layout>
      {!loading && !error ? (
        <div>
          <div className="max-w-[1440px] m-auto">
            <div className="pt-5 pb-[100px]">
              <h2 className="text-[1.8rem] text-center font-poynter">
                Search Result
              </h2>
            </div>
            <div className="flex items-start flex-wrap gap-5  gap-5">
              {searchResults &&
                searchResults.map((book: any) => {
                  return (
                    <BookCard
                      id={book._id}
                      key={book._id}
                      imageUrl={book.images}
                      title={book.title}
                      author={book.author.name}
                      rating={book.ratings}
                    />
                  );
                })}
            </div>
           
          </div>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </Layout>
  );
};

export default SearchResult;
