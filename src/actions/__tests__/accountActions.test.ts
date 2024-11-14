import axios from "axios";
import { Dispatch } from "redux";
import {
  accountLoginRequest,
  accountLoginSuccess,
  accountLoginFail,
  accountSignupRequest,
  accountSignupSuccess,
  accountSignupFail,
} from "../../reducers/accountReducers";
import { resetAuthStateAction, adminLoginHandler, adminSignupHandler } from "../../actions/accountActions";
import { resetAuthState } from "../../reducers/authSlice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Auth Actions", () => {
  let mockDispatch: Dispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    jest.clearAllMocks();
  });

  describe("resetAuthStateAction", () => {
    it("should dispatch resetAuthState", () => {
      resetAuthStateAction()(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(resetAuthState());
    });
  });

  describe("adminLoginHandler", () => {
    const userLoginData = { email: "test@example.com", password: "password123" };
    const apiResponse = {
      token: "mockToken",
      user: { id: 1, name: "Test User" },
    };

    it("should dispatch accountLoginRequest and accountLoginSuccess on success", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: apiResponse });

      await adminLoginHandler(userLoginData)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(accountLoginRequest());
      expect(mockDispatch).toHaveBeenCalledWith(accountLoginSuccess(apiResponse));
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "authToken",
        JSON.stringify({ token: "mockToken" })
      );
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "userData",
        JSON.stringify(apiResponse)
      );
    });

    it("should dispatch accountLoginRequest and accountLoginFail on failure", async () => {
      const errorMessage = "Invalid credentials";
      mockedAxios.post.mockRejectedValueOnce({
        response: { data: { non_field_errors: errorMessage } },
      });

      await adminLoginHandler(userLoginData)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(accountLoginRequest());
      expect(mockDispatch).toHaveBeenCalledWith(accountLoginFail(errorMessage));
    });
  });

  describe("adminSignupHandler", () => {
    const userData = {
      name: "John",
      email: "test@example.com",
      password: "password123",
    };
    const apiResponse = {
      token: "mockToken",
      user: { id: 1, name: "John Doe" },
    };

    it("should dispatch accountSignupRequest and accountSignupSuccess on success", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: apiResponse });

      await adminSignupHandler(userData)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(accountSignupRequest());
      expect(mockDispatch).toHaveBeenCalledWith(accountSignupSuccess(apiResponse));
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "authToken",
        JSON.stringify({ token: "mockToken" })
      );
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "userData",
        JSON.stringify(apiResponse)
      );
    });

    it("should dispatch accountSignupRequest and accountSignupFail on failure", async () => {
      const errorMessage = "Email already exists";
      mockedAxios.post.mockRejectedValueOnce({
        response: { data: { non_field_errors: errorMessage } },
      });

      await adminSignupHandler(userData)(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(accountSignupRequest());
      expect(mockDispatch).toHaveBeenCalledWith(accountSignupFail(errorMessage));
    });
  });
});
