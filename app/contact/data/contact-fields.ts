import { ContactProps } from "../types/contact-props";

export const ContactFields: ContactProps[] = [
  {
    type: "text",
    name: "first_name",
    placeholder: "First Name",
  },
  {
    type: "text",
    name: "last_name",
    placeholder: "Last Name",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    type: "text",
    name: "subject",
    placeholder: "Subject",
  },
  {
    type: "text",
    name: "message",
    placeholder: "Message",
    input: "textarea",
  },
];
