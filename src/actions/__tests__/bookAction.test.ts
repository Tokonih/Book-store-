import axios from "axios";
import { createBook, getAllBooks, getSingleBook } from "../../actions/bookActions";
import {
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAIL,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAIL,
  GET_SINGLE_BOOK_REQUEST,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_BOOK_FAIL,
} from "../../constants/bookConstants";

jest.mock("axios");

describe("Book Actions", () => {
  let dispatch:any;

  beforeEach(() => {
    dispatch = jest.fn(); 
    jest.clearAllMocks(); 
  });

  describe("createBook", () => {
    it("should dispatch CREATE_BOOK_SUCCESS on successful book creation", async () => {
      const mockBook = { title: "Test Book", author: "Test Author" };
      const mockResponse = { data: { message: "Book created successfully" } };

      (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

      await createBook(mockBook)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_BOOK_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: CREATE_BOOK_SUCCESS,
        payload: mockResponse.data,
      });
    });

    it("should dispatch CREATE_BOOK_FAIL on failed book creation", async () => {
      const mockBook = { title: "Test Book", author: "Test Author" };
      const mockError = new Error("Failed to create");

      (axios.post as jest.Mock).mockRejectedValueOnce(mockError);

      await createBook(mockBook)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_BOOK_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: CREATE_BOOK_FAIL,
        payload: "Failed to create",
      });
    });
  });

  describe("getAllBooks", () => {
    it("should dispatch GET_BOOK_SUCCESS on successful fetch", async () => {
      const mockResponse = { data: { books: [{ id: 1, title: "Book 1" }] } };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      await getAllBooks()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: GET_BOOK_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_BOOK_SUCCESS,
        payload: mockResponse.data,
      });
    });

    it("should dispatch GET_BOOK_FAIL on failed fetch", async () => {
      const mockError = { response: { data: { non_field_errors: "Error" } } };

      (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

      await getAllBooks()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: GET_BOOK_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_BOOK_FAIL,
        payload: "Error",
      });
    });
  });

  describe("getSingleBook", () => {
    it("should dispatch GET_SINGLE_BOOK_SUCCESS on successful fetch", async () => {
      const mockBookId = "123";
      const mockResponse = { data: { book: { id: "123", title: "Book 123" } } };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      await getSingleBook(mockBookId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: GET_SINGLE_BOOK_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_SINGLE_BOOK_SUCCESS,
        payload: mockResponse.data,
      });
    });

    it("should dispatch GET_SINGLE_BOOK_FAIL on failed fetch", async () => {
      const mockBookId = "123";
      const mockError = { response: { data: { non_field_errors: "Error" } } };

      (axios.get as jest.Mock).mockRejectedValueOnce(mockError);

      await getSingleBook(mockBookId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: GET_SINGLE_BOOK_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_SINGLE_BOOK_FAIL,
        payload: "Error",
      });
    });
  });
});
