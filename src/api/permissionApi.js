import axiosInstance from "./axios";

export const setStaffPermissions = async (userId, permissions) => {
    const res = await axiosInstance.post(`/permission/${userId}`, permissions);
    return res.data;
};

export const getStaffPermissions = async (userId) => {
    const res = await axiosInstance.get(`/permission/get/${userId}`);
    return res.data;
};
