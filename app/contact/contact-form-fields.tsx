import React from "react";
import { ContactProps } from "./types/contact-props";

type Props = {
  ContactFields: ContactProps[];
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const ContactFormFields: React.FC<Props> = ({ ContactFields, formData, handleChange }) => {
  return (
    <>
      {ContactFields.map((field, index) => (
        <div
          key={index}
          className={` ${field.input === "textarea" ? "col-span-1 sm:col-span-2" : ""}`}
        >
          {field.input === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="h-48 p-5 outline-black resize-none border border-r-secondary-foreground w-full"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="h-12 px-5 border border-r-secondary-foreground w-full"
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default ContactFormFields;
