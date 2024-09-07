import React, { useEffect, useState, ReactNode } from "react";
import { AuthAxiosInstance } from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { useAuthHook } from "../api/hooks";

interface AxiosInterceptorProps {
  children: ReactNode;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const navigation = useNavigation();
  const { logoutUser } = useAuthHook();

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = async (error: any) => {
      // In case of 401 Unauthorized, move the user to login, clear Storage
      if (error?.response && error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    };

    const interceptor = AuthAxiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    console.log("Axios Interceptor set");
    setIsSet(true);

    return () => {
      AuthAxiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logoutUser]);

  return isSet ? <>{children}</> : null;
};

export default AxiosInterceptor;
