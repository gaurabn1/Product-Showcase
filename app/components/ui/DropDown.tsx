import { useState, createContext, useContext } from "react"
import Button from "./Button"

interface DropDownProps {
  children: React.ReactNode
}

interface DropDownContextProps {
  isOpen: boolean
  toogle: () => void
}

const DropDownContext = createContext<DropDownContextProps | null>(null)

export function DropDown({ children }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <DropDownContext.Provider value={{ isOpen, toogle: toggle }}>
      <div className="relative">
        {children}
      </div>
    </DropDownContext.Provider>
  )
}

export function DropDownTrigger({ children }: DropDownProps) {
  const context = useContext(DropDownContext)
  if (!context) throw new Error("DropDownTrigger must be used within a DropDown")
  return (
    <Button onClick={context.toogle} variant="primary">{children}</Button>
  )
}

export function DropDownItem({ children }: DropDownProps) {
  const context = useContext(DropDownContext)
  if (!context) throw new Error("DropDownTrigger must be used within a DropDown")
  if (!context.isOpen) return null

  return (
    <div>
      {children}
    </div>
  )
}
