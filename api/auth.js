import api from "./api";

export const loginUser = async (data) => {
    const response = await api.post("/user/login", data);
    return response.data;
};

export const signupUser = async (data) => {
    const response = await api.post("/user/signup", data);
    return response.data;
};
