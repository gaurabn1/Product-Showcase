import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Contact {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  subject: string,
  message: string
}

const fetchContacts = async () => {
  const { data } = await axios.get("http://localhost:8000/api/contacts/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }
  })
  return data
}

export const useContacts = () => {
  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  })
}

