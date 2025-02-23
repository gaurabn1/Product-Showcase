import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}


export function Input({ className, ...props }: InputProps) {
  return <input className={`default-styles ${className}`} {...props} />
}
