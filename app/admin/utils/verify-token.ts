import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface AccessPageProps {
  access: string;
}

export default async function Verify_token({ access }: AccessPageProps) {
  if (access) {
    const res = await axios.post('http://localhost:8000/api/auth/verify/', {},
      {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      });
    if (res.status !== 200) {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      toast.error("Session expired. Please login again.")

      return false
    }
    return true
  }
};
