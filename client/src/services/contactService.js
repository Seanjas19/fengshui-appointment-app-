import api from "../api/axios";

const contact = async(contactData) => {
    const response = await api.post("/contact", contactData);
    return response.data.message;
} 


const contactService = {
    contact
}

export default contactService;
