import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = 'http://localhost:5000';

export async function sendMessage(data) {
  try {
    const response = await axios.post(`${BASE_URL}/contact`, data);
    console.log(response.status)
    if (response.status === 201)
      toast.success("Message sent successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to send message, please try again later");
    throw error;
  }
}


