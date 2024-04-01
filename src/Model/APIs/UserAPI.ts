import { Order, User } from "@/Model/Interfaces";
import { genericAPI } from "./GenericAPI";
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

interface LoginResponse {
  token: string;
}

class UserAPI {
  static readonly endpoint = "/users";

  async signUp(userData: User): Promise<void> {
    try {
      await genericAPI.post(`${UserAPI.endpoint}/signup`, userData);
    } catch (error) {
      console.error("Error signing up user:", error);
      throw new Error("Error signing up user");
    }
  }

  async userLogin(email: string, password: string): Promise<void> {
    try {
      const response: AxiosResponse<LoginResponse> = await genericAPI.post(`${UserAPI.endpoint}/login`, { email, password });
      
      // Extract the authToken from the response
      const authToken = response.data.token;

      // Store the authToken securely in a cookie with the name 'authToken'
      // Set the cookie to be HTTP-only to prevent access from JavaScript
      Cookies.set('authToken', authToken, { httpOnly: true });

      // Redirect the user to a protected page or perform other actions
      // For example:
      window.location.href = '/';
    } catch (error) {
      // Handle login error (e.g., display error message to the user)
      console.error('Login failed:', error);
      throw new Error("Login failed");
    }
  }
  
  
  async addOrder(email: string, newOrderData: Order): Promise<void> {
    try {
      // Retrieve the authentication token from the cookie
      const token = this.getToken();
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      // Set the request headers with the authentication token
      const headers: AxiosRequestConfig['headers'] = {
        Authorization: `Bearer ${token}`,
      };

      // Make a POST request to the add-order endpoint with the data and headers
      await genericAPI.post(`${UserAPI.endpoint}/add-order`, { email, newOrderData }, headers);

      // Log success message
    } catch (error) {
      console.error("Error adding order to user:", error);
      throw new Error("Error adding order to user");
    }
  }

  private getToken(): string | null {
    const authToken = Cookies.get('authToken');
    return authToken !== undefined ? authToken : null;
  }
}

export const userAPI = new UserAPI();
