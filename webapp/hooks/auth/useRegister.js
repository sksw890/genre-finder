import { authService } from "../../services";
import Cookies from "js-cookie";

export const useRegister = () => {
  const register = async (username, password) => {
    const user = await authService.register(username, password);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user;
  };

  return { register };
};