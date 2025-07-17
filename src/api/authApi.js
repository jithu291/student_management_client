import axiosInstance from "./axios";

export const loginAdmin = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
