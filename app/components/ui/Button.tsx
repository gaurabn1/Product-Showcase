import { cva } from "class-variance-authority"

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'transparent',
  noHover?: boolean,
  className?: string,
  disabled?: boolean
}


const buttonVariants = cva(
  "py-2 px-4 font-semibold rounded-lg shadow-md transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed",
        secondary: "bg-gray-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed",
        transparent: "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed",
      },
      noHover: {
        true: "hover:bg-transparent hover:text-blue-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);


export default function Button({ variant, noHover, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${buttonVariants({ variant, noHover })} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    />
  );
}

