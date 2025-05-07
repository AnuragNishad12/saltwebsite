import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

export default function ResponsiveCategoryNavigation() {



  
  // Sample categories - replace with your actual data
  const categories = [
    { id: 1, name: 'Audio & Tech Gear' },
    { id: 2, name: 'Gadgets & Accessories' },
    { id: 3, name: 'Clothing' },
  ];

  const [activeItem, setActiveItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Category Navigation */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center py-3">
            <div className="flex bg-orange-400/30 rounded-xl backdrop-blur-sm">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-center h-12 px-6 cursor-pointer transition-all duration-300 ease-in-out mx-1 ${
                    activeItem === category.id || selectedItem === category.id
                      ? 'bg-white rounded-lg shadow-md text-orange-500 font-medium'
                      : 'text-white hover:bg-white/20 hover:rounded-lg'
                  }`}
                  onMouseEnter={() => setActiveItem(category.id)}
                  onMouseLeave={() => setActiveItem(null)}
                  onClick={() => setSelectedItem(category.id === selectedItem ? null : category.id)}
                >
                  <p className="text-center whitespace-nowrap">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex justify-between items-center py-3">
            <p className="text-white font-medium">Categories</p>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-orange-400/30 backdrop-blur-sm text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden container mx-auto px-4 pb-3">
            <div className="bg-orange-400/40 backdrop-blur-sm rounded-xl overflow-hidden">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`py-3 px-4 cursor-pointer ${
                    selectedItem === category.id 
                      ? 'bg-white text-orange-500 font-medium' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  onClick={() => {
                    setSelectedItem(category.id === selectedItem ? null : category.id);
                    // Optionally close the menu after selection on mobile
                    // setMobileMenuOpen(false);
                  }}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-medium text-gray-800">
            {selectedItem ? `${categories.find(cat => cat.id === selectedItem)?.name} Content` : 'Welcome!'}
          </h2>
          <p className="mt-3 text-gray-600">
            {selectedItem 
              ? `You are currently viewing the ${categories.find(cat => cat.id === selectedItem)?.name} section.`
              : 'Please select a category from the navigation menu.'}
          </p>
        </div>
      </div>
    </div>
  );
}