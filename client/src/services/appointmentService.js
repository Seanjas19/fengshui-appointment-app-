import api from "../api/axios";



const getAppointment = async() => {
    const response = await api.get("/appointment");
    return response.data;
}


const createAppointment = async(appointmentData) => {
    const response = await api.post("/appointment", appointmentData);
    return response.data;
}


const updateAppointment = async(id, appointmentData) => {
    await api.put(`/appointment/${id}`, appointmentData);
}


const deleteAppointment = async(id) => {
    await api.delete(`/appointment/${id}`);
}

const appointmentService = {
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentService;