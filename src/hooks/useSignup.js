import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { tr } from "date-fns/locale";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setisLoading(true);
    setError(false);

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setisLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //saving the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update authContext
      dispatch({ type: "LOGIN", payload: json });
      setisLoading(false);
    }
  };
  return { signup, isLoading, error };
};
