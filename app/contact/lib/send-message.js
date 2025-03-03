import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = 'http://localhost:8000';

export async function sendEmail(data) {
  try {
    const response = await axios.post(`${BASE_URL}/api/subscribe/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201)
      toast.success("Subscribed to newsletter");
    return response.status;
  } catch (error) {
    toast.error("Failed to subscribe, please try again later");
    throw error;
  }
}

export async function sendMessage(data) {
  try {
    const response = await axios.post(`${BASE_URL}/api/contact/add/`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.status === 201)
      toast.success("Message sent successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to send message, please try again later");
    throw error;
  }
}


