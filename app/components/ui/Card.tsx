type CardProps = {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ">
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return (
    <div className="flex items-center justify-between text-xl font-bold">
      {children}
    </div>
  )
}

export function CardBody({ children }: CardProps) {
  return (
    <div className="mt-4">
      {children}
    </div>
  )
}

export function CardFooter({ children }: CardProps) {
  return (
    <div className="mt-4">
      {children}
    </div>
  )
}
