"use client"
import React, { useState } from "react";
import Button from "./ui/Button";
import { sendMessage } from "../contact/lib/send-message";
import { ContactFields } from "../contact/data/contact-fields";
import { z } from 'zod';
import toast from "react-hot-toast";
import { contactSchema } from "../contact/schemas/contact.schema";
import Image from "next/image";
import ContactFormFields from "../contact/contact-form-fields";
import Subscription from "./subscription";
import { motion } from "framer-motion"


type FormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  }));

  //const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = contactSchema.safeParse(formData)
    if (!result.success) {
      const errorMap: Partial<FormData> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path[0] as keyof FormData] = err.message;
      });
      //setErrors(errorMap);

      result.error.errors.forEach((err) => {
        toast.custom((t) => (
          <div
            className={`toast ${t.visible ? 'fade-in' : 'fade-out'} bg-red-600 text-white p-4 rounded-md`}
          >
            <div className="flex justify-between items-center">
              <p>{err.message}</p>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-white font-bold ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        ));
      });
      return;
    }

    //setErrors({});

    try {
      const response = await sendMessage(formData);
      if (response) {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <main className="px-10 mt-2">
      <div className="lg:flex lg:gap-5 lg:items-center">
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
          className="flex flex-col lg:w-1/2 pb-5 my-14 lg:my-0"
        >
          <h1 className="text-3xl font-bold">Get in touch</h1>
          <p className="mt-8 text-lg">Want to get in touch with us? Send us a message and we&apos;ll get back to you as soon as possible</p>
          <p className="mt-8 text-lg">For more information , Please subscribe to our newsletter.</p>
          <Subscription />
        </motion.div>
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 0.8,
          }}
          className="hidden lg:block"
        >
          <Image priority src="/images/about.png" className="hidden sm:block" alt="Contact" width={350} height={350} />
        </motion.div>
      </div>
      <form onSubmit={handleSubmit} className="mb-3">
        <h2 className="text-3xl mb-3">Contact Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-5 mb-3">
          <ContactFormFields
            ContactFields={ContactFields}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="transparent">Submit Form</Button>
        </div>
      </form>
    </main>
  );
};

