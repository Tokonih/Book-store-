import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import {
  createBook,
  getAllBooks,
  getSingleBook,
  resetCreateBookState,
} from "../bookActions";
import {
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAIL,
  ADD_NEW_BOOK,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAIL,
  GET_SINGLE_BOOK_REQUEST,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_BOOK_FAIL,
} from "../../constants/bookConstants";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Book Actions", () => {
  let mockDispatch: Dispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  describe("createBook", () => {
    const createBookPayload = { title: "Test Book", author: "Author Name" };
    const apiResponse = {
      id: 1,
      title: "Test Book",
      author: "Author Name",
    };

    beforeEach(() => {
      sessionStorage.setItem("authToken", JSON.stringify({ token: "mockToken" }));
    });

    it("should dispatch CREATE_BOOK_REQUEST, CREATE_BOOK_SUCCESS, and ADD_NEW_BOOK on success", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: apiResponse });

      await createBook(createBookPayload)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_BOOK_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CREATE_BOOK_SUCCESS,
        payload: apiResponse,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ADD_NEW_BOOK,
        payload: apiResponse,
      });
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}book/create`,
        createBookPayload,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer mockToken",
          }),
        })
      );
    });

    it("should dispatch CREATE_BOOK_REQUEST and CREATE_BOOK_FAIL on failure", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Failed to create"));

      await createBook(createBookPayload)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_BOOK_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CREATE_BOOK_FAIL,
        payload: "Failed to create",
      });
    });
  });

  describe("getAllBooks", () => {
    const apiResponse = [
      { id: 1, title: "Book 1", author: "Author 1" },
      { id: 2, title: "Book 2", author: "Author 2" },
    ];

    it("should dispatch GET_BOOK_REQUEST and GET_BOOK_SUCCESS on success", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: apiResponse });

      await getAllBooks()(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: GET_BOOK_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: GET_BOOK_SUCCESS,
        payload: apiResponse,
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}book/`,
        expect.objectContaining({
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    it("should dispatch GET_BOOK_REQUEST and GET_BOOK_FAIL on failure", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

      await getAllBooks()(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: GET_BOOK_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: GET_BOOK_FAIL,
        payload: "Failed to fetch",
      });
    });
  });

  describe("getSingleBook", () => {
    const bookId = "1";
    const apiResponse = { id: 1, title: "Single Book", author: "Author Name" };

    it("should dispatch GET_SINGLE_BOOK_REQUEST and GET_SINGLE_BOOK_SUCCESS on success", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: apiResponse });

      await getSingleBook(bookId)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: GET_SINGLE_BOOK_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: GET_SINGLE_BOOK_SUCCESS,
        payload: apiResponse,
      });
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}book/${bookId}`,
        expect.objectContaining({
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    it("should dispatch GET_SINGLE_BOOK_REQUEST and GET_SINGLE_BOOK_FAIL on failure", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch book"));

      await getSingleBook(bookId)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: GET_SINGLE_BOOK_REQUEST });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: GET_SINGLE_BOOK_FAIL,
        payload: "Failed to fetch book",
      });
    });
  });

  describe("resetCreateBookState", () => {
    it("should dispatch RESET_CREATE_BOOK_STATE", () => {
      resetCreateBookState()(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "RESET_CREATE_BOOK_STATE",
      });
    });
  });
});
