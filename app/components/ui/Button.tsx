import { cva } from "class-variance-authority"

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'transparent',
  noHover?: boolean
}


const buttonVariants = cva(
  'py-2 px-4 font-semibold rounded-lg shadow-md',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white',
        transparent: 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white'
      },
      noHover: {
        true: 'hover:bg-transparent hover:text-blue-500'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)


export default function Button({ variant, noHover, ...props }: ButtonProps) {
  return <button {...props} className={buttonVariants({ variant, noHover })} />
}

