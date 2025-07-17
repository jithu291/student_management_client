import axiosInstance from "./axios";

export const getStudents = async () => {
  const res = await axiosInstance.get("/student/get");
  return res.data;
};

export const createStudent = async (data) => {
  const res = await axiosInstance.post("/student/create", data);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await axiosInstance.put(`/student/edit/${id}`, data);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await axiosInstance.delete(`/student/delete/${id}`);
  return res.data;
};
