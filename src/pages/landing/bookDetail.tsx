import React, { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import hero from "../../asset/images/home-hero.jpg";
import RatingBreakdown from "../../components/ratingBreakdown";
import { Modal, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useParams } from "react-router-dom";
import { getSingleBook } from "../../actions/bookActions";
import { reviewHandler } from "../../actions/reviewActions";
import { markAsRead } from "../../actions/markReadActions";
import { MarkReadData } from "../../types";
import { AddReview } from "../../reducers/reviewReducers";

function BookDetail() {
  const [activeTab, setActiveTab] = useState<"productDetails" | "aboutAuthor">(
    "productDetails"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const { loading, book, error } = useSelector(
    (state: RootState) => state.singleBook
  );
  const markReadState = useSelector(
    (state: RootState) => state.markReadReducer
  );
  useEffect(() => {
    dispatch(getSingleBook(bookId as string) as any);
  }, [bookId]);

  const handleReviewModal = () => {
    setShowModal(!showModal);
  };

  console.log(book);

  const handleRatingClick = (rating: number) => {
    console.log(`User clicked on rating: ${rating}`);
  };

  interface MyModalProps {
    show: boolean;
    handleClose: () => void;
  }

  interface User {
    _id: string;
  }

  interface ReviewData {
    rating: any;
    comment: string;
    bookId: any;
  }

  const { authorId } = useParams<{ authorId: string }>();
  const userId = JSON.parse(sessionStorage.getItem("userData") || "{}");

  const handleReview = () => {
    const reviewData: AddReview = {
      bookId: book?._id,
      rating: selectedRating,
      comment: reviewText,
    };

    dispatch(markAsRead(reviewData) as any);

    handleReviewModal();
  };



  const handleMarkRead = () => {
    const markRead: MarkReadData = {
      bookId: book?._id,
    };
  
    dispatch(markAsRead(markRead) as any);
  };

  return (
    <Layout>
      <div>
        {loading ? (
          <h1> Loading</h1>
        ) : book ? (
          <div>
            <div className="max-w-[1440px] px-[30px]   m-auto flex items-start">
              <figure className=" h-[400px] w-[40%]  ">
                <img
                  src={book?.images}
                  className="w-full h-[100%] max-h-[100%] object-contain aspect-[3/4]"
                />
              </figure>
              <div className="w-[60%] p-[20px]">
                <h1 className="book-title font-[400] text-[2.08rem] leading-[1.25]">
                  {book?.title}
                </h1>
                <span className="font-lato font-normal text-[0.8rem] my-3">
                  by{" "}
                  <Link to={`/author/${book?.author?._id}`} className="text-[#347d56] cursor-pointer">
                    {book?.author?.name}
                  </Link>
                </span>

                <div className="flex gap-[10px] text-[#347d56] font-semibold text-[14px]">
                  <span>{book.ratings}⭐</span> 4.8(272){" "}
                  <button onClick={handleReviewModal}>Write A Rewiew</button>
                </div>
                <hr className="my-4" />
                <p className="leading-[1.8] text-[14px] text-black font-[400] max-h-[200px] overflow-scroll custom-scrollbar-hidden">
                  {book?.description}
                </p>
                <button
                  onClick={handleMarkRead}
                  className="my-5 h-[3rem] px-[3.2rem] bg-[#3d6db5] text-white font-lato font-[500] text-[1rem]"
                >
                  Mark As Read
                </button>
              </div>
            </div>

            <div className="">
              <div className="w-full max-w-[53rem] mx-auto mt-8">
                {/* Tab Headers */}
                <div className="flex justify-center items-center  border-b w-full">
                  <button
                    onClick={() => setActiveTab("productDetails")}
                    className={`px-4 py-2 w-[175px] ${
                      activeTab === "productDetails"
                        ? " border border-b-0 font-[400] font-lato  text-black"
                        : "text-[#347d56] font-[400] font-lato"
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveTab("aboutAuthor")}
                    className={`px-4 py-2  ${
                      activeTab === "aboutAuthor"
                        ? "border border-b-0 font-[400] font-lato  text-black"
                        : "text-[#347d56] font-[400] font-lato"
                    }`}
                  >
                    About the Author
                  </button>
                </div>

                {/* Tab Content */}
                <div className="pt-[2.25rem] w-full">
                  {activeTab === "productDetails" ? (
                    <div>
                      <p className="text-[1.8rem] text-center font-poynter  mb-4">
                        Product Details
                      </p>
                      <ul className="text-gray-700  prod-detail-list">
                        <li>
                          <span>ISBN-13:</span> 9781368104807
                        </li>
                        <li>
                          <span>Publisher:</span>{" "}
                          <span className="text-green-700">
                            {book?.author?.name}
                          </span>
                        </li>
                        <li>
                          <span>Publication date:</span> {book?.publishedDate}
                        </li>
                        <li>
                          <span>Edition description:</span> B&N Exclusive
                          Edition
                        </li>
                        <li>
                          <span>Pages:</span> 224
                        </li>
                        <li>
                          <span>Sales rank:</span> 2
                        </li>
                        <li>
                          <span>Product dimensions:</span> 7.70(w) x 9.10(h) x
                          1.00(d)
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[1.8rem] text-center font-poynter mb-4">
                        About the Author
                      </p>
                      <div className="flex items-start ">
                        <figure className="max-w-[33%] px-[2rem] max-h-[282px] border ">
                          <img src="" className="h-full w-full" alt="" />
                        </figure>
                        <p className="text-gray-700 leading-[1.8] text-[1rem] font-[400] font-lato">
                          {book?.author?.name}
                          is a writer, animator, voice actor, and director. He
                          is best known for creating Gravity Falls on Disney XD.
                          He was raised in Piedmont, California, and received a
                          BFA in Character Animation from The California
                          Institute of the Arts. He currently lives in Los
                          Angeles and is at work developing projects for film
                          and television. Despite the rumors, he was NOT
                          possessed by a demon while writing this book. We
                          repeat: NOT DEMONICALLY POSSESSED.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="review-heading max-w-[1440px] m-auto pt-5 pb-[100px]">
                <h2 className="text-[1.8rem] text-center font-poynter">
                  Customers Review
                </h2>
                <div className="mt-[30PX] ">
                  <div className="flex items-center justify-between my-5">
                    <p className="text-[18px] font-[sans-serif] font-[400]">
                      REVIEWS
                    </p>{" "}
                    <button
                      onClick={handleReviewModal}
                      className="bg-[#3d6db5] text-white font-[13px] font-[700] font-[sans-serif] p-[10px]"
                    >
                      Write A Review
                    </button>
                  </div>
                  <div className="my-5 flex items-start">
                    <div className="w-[30%]">
                      <h3 className=" text-[15px] text-[#21282d ] font-[600] font-[sans-serif]">
                        Rating Snapshot
                      </h3>
                      <p className=" text-[13px] text-[#21282d ] font-[400] font-[sans-serif] pt-[4] pb-[px]">
                        Select a row below to filter reviews{" "}
                      </p>
                      <div className="py-4">
                        <RatingBreakdown onRatingClick={handleRatingClick} />
                      </div>
                    </div>
                    {book?.reviews?.map((r) => (
                      <div className="w-[70%]">
                        <span className=" text-[#347d56] font-semibold text-[14px]">
                          {r?.rating}⭐ {r?.user?.name}
                        </span>

                        <p className="text-gray-700 leading-[1.8] text-[1rem] font-[400] font-lato max-h-[200px] overflow-scroll custom-scrollbar-hidden">
                          {r?.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {showModal && (
              <Modal
                show={showModal}
                onHide={handleReviewModal}
                backdrop="static"
              >
                <Modal.Header closeButton>
                  <Modal.Title className="text-[1.8rem] font-poynter">
                    Write A Review
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Rating
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={30}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setSelectedRating(star)}
                          color={
                            (hoverRating ?? selectedRating ?? 0) >= star
                              ? "#347d56"
                              : "#ccc"
                          }
                          className="cursor-pointer transition duration-200"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="review"
                      className="block text-gray-700 font-semibold"
                    >
                      Review
                    </label>
                    <textarea
                      id="review"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review here..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleReviewModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleReview}
                    // disabled={!selectedRating || !reviewText}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Layout>
  );
}

export default BookDetail;
