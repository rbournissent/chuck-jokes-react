import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <article className="w-1/2 relative px-10 py-5 bg-slate-100 rounded-md shadow-md shadow-zinc-300">
      {children}
    </article>
  )
}

export default Card
