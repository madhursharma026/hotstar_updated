import jwt_decode from "jwt-decode";

export const useGetUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const result = jwt_decode(token);
  console.log(result);

  return {
    id: result?.id,
    mobile: result?.mobile,
    collection: result?.collection,
    state: result?.state,
  };
};
