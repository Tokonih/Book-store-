import axios from "axios";
import { adminLoginHandler } from "../../actions/accountActions";
import {
  accountLoginRequest,
  accountLoginSuccess,
  accountLoginFail,
} from "../../reducers/accountReducers";
import { Dispatch } from "redux";
import { UserLoginData, ApiResponse } from "../../types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Account Actions", () => {
  let dispatch: jest.MockedFunction<Dispatch>;

  beforeEach(() => {
    dispatch = jest.fn();
    jest.clearAllMocks();
  });

  describe("adminLoginHandler", () => {
    it("should dispatch accountLoginSuccess on successful login", async () => {
      const userLoginData: UserLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      const mockResponse: ApiResponse = {
        token: "fake-jwt-token",
        message: "Login successful",
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      await adminLoginHandler(userLoginData)(dispatch);

      // Assert that the correct actions were dispatched
      expect(dispatch).toHaveBeenCalledWith(accountLoginRequest());
      expect(dispatch).toHaveBeenCalledWith(accountLoginSuccess(mockResponse));
    });

    it("should dispatch accountLoginFail on login error", async () => {
      const userLoginData: UserLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      const mockError = {
        response: { data: { non_field_errors: "Invalid credentials" } },
      };

      mockedAxios.post.mockRejectedValueOnce(mockError);

      await adminLoginHandler(userLoginData)(dispatch);

      // Assert that the correct actions were dispatched
      expect(dispatch).toHaveBeenCalledWith(accountLoginRequest());
      expect(dispatch).toHaveBeenCalledWith(
        accountLoginFail("Invalid credentials")
      );
    });
  });
});
