import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaChevronDown } from 'react-icons/fa';

interface CategoryDropdownProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategoryDropdown = ({ categories, selectedCategory, onCategorySelect }: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="m-2 py-2 px-4 text-blue-500 border border-blue-500 flex items-center focus-visible:outline-none">
          <span className="z-0 cursor-pointer">Categories</span>
          <FaChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {categories.map((category) => (
          <DropdownMenuItem key={category} onClick={() => onCategorySelect(category)}>
            <p className="capitalize cursor-pointer">{category}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
