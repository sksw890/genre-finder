import axios, { AxiosInstance } from "axios";

export class AuthService {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (username, password) => {
    return this.instance
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        return {
          username: res.data.username,
          id: res.data.id,
          accessToken: res.data.token,
        };
      });
  };

  register = (username, password) => {
    return this.instance
      .post("/register", {
        username,
        password,
      })
      .then((res) => {
        return {
          username: res.data.username,
          id: res.data.id,
          accessToken: res.data.token,
        };
      });
  };
}