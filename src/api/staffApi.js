import axiosInstance from "./axios";

export const getStaff = async () => {
    const res = await axiosInstance.get("/staff/get");
    return res.data;
};

export const createStaff = async (data) => {
    const res = await axiosInstance.post("/staff/create", data);
    return res.data;
};

export const updateStaff = async (id, data) => {
    const res = await axiosInstance.put(`/staff/edit/${id}`, data);
    return res.data;
};

export const deleteStaff = async (id) => {
    const res = await axiosInstance.delete(`/staff/delete/${id}`);
    return res.data;
};

export const getByUserId = async (userId) => {
    const res = await axiosInstance.put(`/staff/getByUserId/${userId}`);
    return res.data;
};

