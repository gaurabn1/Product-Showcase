import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Subscription {
  id: string,
  email: string,
}

const fetchSubscriptions = async () => {
  const { data } = await axios.get("http://localhost:8000/api/subscribers/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }
  })
  return data
}

export const useSubscriptions = () => {
  return useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: fetchSubscriptions,
  })
}

