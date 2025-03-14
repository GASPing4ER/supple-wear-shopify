import {useState} from 'react';
import {ChevronDown, Check} from 'lucide-react';

type CategoryFilterProps = {
  categories: string[];
  onFilter: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  onFilter,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelect = (event: React.MouseEvent, category: string) => {
    event.stopPropagation(); // Prevent triggering product click event
    setSelectedCategory(category);
    onFilter(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* Dropdown toggle button */}
      <button
        className="flex items-center justify-between w-48 px-4 py-2 border rounded-lg bg-white shadow-sm text-gray-700 hover:bg-gray-100 capitalize"
        onClick={(e) => {
          e.stopPropagation(); // Prevent dropdown from closing if clicked inside
          setIsOpen(!isOpen);
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedCategory || 'All'}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white text-black border rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <li>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                onClick={(e) => handleSelect(e, 'all')}
              >
                {selectedCategory === null && (
                  <Check className="w-4 h-4 mr-2" />
                )}
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center capitalize"
                  onClick={(e) => handleSelect(e, category)}
                >
                  {selectedCategory === category && (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
