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
  const books = [
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
            <div className="review-heading pt-5 pb-[100px]">
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
            <BookShow>
              <BookCarousel books={books} />;
            </BookShow>
          </div>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </Layout>
  );
};

export default SearchResult;
