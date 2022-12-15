import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { refreshTokenSchema } from "../Schemas/refreshToken";

export const useAuth = () => {
  const history = useHistory();
  const [refreshToken, {}] = useMutation(refreshTokenSchema);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === "null" ||
      localStorage.getItem("token") === "undefined"
    ) {
      if (history.location.pathname !== "/login") {
        history.push("/login");
      }
    } else {
      setLoading(true);
      refreshToken({
        variables: { token: `${localStorage.getItem("token")}` },
      })
        .then((result) => {
          console.log(result?.data?.refreshToken?.refreshToken);
          localStorage.setItem("token", result?.data?.refreshToken?.token);
          // dispatch(LoginDetailsSave(result.data))
          if (history.location.pathname === "/login") {
            history.push("/");
          }
        })
        .catch(() => {
          localStorage.setItem("token", "");
          history.push("/login");
        })
        .finally(() => setLoading(false));
      //TODO
    }
  }, []);

  return { loading };
};
