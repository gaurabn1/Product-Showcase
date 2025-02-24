import axios from "axios";

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post("http://localhost:5000/api/token/refresh/", {
      refreshToken: refreshToken,
    });
    if (response.status === 200) {
      localStorage.setItem("access", response.data.accessToken);
      return response.data.accessToken;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
