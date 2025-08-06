import { useEffect, useState } from "react";
import Link from "next/link";
import ReactDOM from "react-dom";

type CategoriesDropdownProps = {
  categories: { category_id: number; category_name: string; category_slug: string }[];
  categoriesRef: React.RefObject<HTMLDivElement>;
  categoriesDropdownOpen: boolean;
  setCategoriesDropdownOpen: (open: boolean) => void;
};

export default function CategoriesDropdown({ 
  categories, 
  categoriesRef, 
  categoriesDropdownOpen, 
  setCategoriesDropdownOpen 
}: CategoriesDropdownProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (categoriesRef.current && categoriesDropdownOpen) {
      const rect = categoriesRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [categoriesDropdownOpen, categoriesRef]);

  if (!categoriesDropdownOpen) return null;

  return ReactDOM.createPortal(
    <div
      data-categories-dropdown
      className="fixed bg-white border border-gray-200 rounded-lg shadow-xl"
      style={{
        top: position.top,
        left: position.left,
        width: "256px",
        zIndex: 99999,
        backgroundColor: "white",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="py-2 max-h-80 overflow-y-auto">
        {categories.map((cat) => (
          <Link
            key={cat.category_id}
            href={`/${cat.category_slug}`}
            className="block px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={() => setCategoriesDropdownOpen(false)}
          >
            {cat.category_name}
          </Link>
        ))}
      </div>
    </div>,
    document.body
  );
}