import { cva } from "class-variance-authority"

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'transparent',
  size?: 'icon'
}


const buttonVariants = cva(
  'py-2 px-4 font-semibold rounded-lg shadow-md',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        transparent: 'bg-transparent text-blue-500 border border-blue-500'
      },
      size: {
        icon: 'py-2 px-4'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)


export default function Button({ variant, size, ...props }: ButtonProps) {
  return <button {...props} className={buttonVariants({ variant, size })} />
}

