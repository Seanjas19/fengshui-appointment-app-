import api from "../api/axios";

const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        user_email: email.trim(),
        user_password: password
    });
    
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    
    return response.data;
};

const register = async (userData) => {
    const response = await api.post("/auth/sign-up", userData);
    return response.data;
};

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

const authService = {
    login,
    register,
    logout
};

export default authService;
