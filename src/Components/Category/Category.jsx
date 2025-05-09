import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

export default function ResponsiveCategoryNavigation() {
  const [categories, setCategories] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/allCategory');
        const data = await res.json();
        if (data.success === "Successful") {
          const formattedCategories = Array.isArray(data.message) ? data.message.map((item) => ({
            id: item._id,
            name: item.CategoryName
          })) : [];
          setCategories(formattedCategories);
        } else {
          console.error("Failed to load categories:", data);
          setError("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) {
      setProducts([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
      const data = await res.json();

      if (data && data.success === "success") {
        setProducts(Array.isArray(data.products) ? data.products : []);
        
      } else {
        console.error("Failed to load products:", data);
        setProducts([]);
        setError("Failed to load products");
      }
    } catch (error) {
      console.error(`Error Getting products: ${error}`);
      setProducts([]);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (!categoryId) return;
    
    const newSelected = categoryId === selectedItem ? null : categoryId;
    setSelectedItem(newSelected);
    
    if (newSelected) {
      fetchProductsByCategory(newSelected);
    } else {
      setProducts([]);
    }
    
    // Close mobile menu after selection
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const getSelectedCategoryName = () => {
    if (!selectedItem || !categories || categories.length === 0) return '';
    const selectedCategory = categories.find(cat => cat.id === selectedItem);
    return selectedCategory ? selectedCategory.name : '';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => {
              setError(null);
              if (selectedItem) fetchProductsByCategory(selectedItem);
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Category Navigation */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center py-3">
            <div className="flex bg-orange-400/30 rounded-xl backdrop-blur-sm">
              {categories && categories.length > 0 ? categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-center h-12 px-6 cursor-pointer transition-all duration-300 ease-in-out mx-1 ${
                    activeItem === category.id || selectedItem === category.id
                      ? 'bg-white rounded-lg shadow-md text-orange-500 font-medium'
                      : 'text-white hover:bg-white/20 hover:rounded-lg'
                  }`}
                  onMouseEnter={() => setActiveItem(category.id)}
                  onMouseLeave={() => setActiveItem(null)}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <p className="text-center whitespace-nowrap">{category.name}</p>
                </div>
              )) : (
                <div className="flex items-center justify-center h-12 px-6 text-white">
                  <p>Loading categories...</p>
                </div>
              )}
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
              {categories && categories.length > 0 ? categories.map((category) => (
                <div
                  key={category.id}
                  className={`py-3 px-4 cursor-pointer ${
                    selectedItem === category.id 
                      ? 'bg-white text-orange-500 font-medium' 
                      : 'text-white hover:bg-white/20'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </div>
              )) : (
                <div className="py-3 px-4 text-white">Loading categories...</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          {/* <h2 className="text-2xl font-medium text-gray-800">
            {selectedItem ? getSelectedCategoryName() : 'Welcome!'}
          </h2> */}
          <p className="mt-3 text-gray-600">
            {selectedItem 
              ? `You are currently viewing the ${getSelectedCategoryName()} section.` 
              : 'Please select a category from the navigation menu.'}
          </p>
          
          {/* Products List */}
          <div className="mt-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : (
              <>
                {products && products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div 
                        key={product._id || `product-${Math.random()}`} 
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                      >
                        {/* Image Container */}
                        <div className="relative h-64 overflow-hidden bg-gray-100">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <p className="text-gray-400">No image available</p>
                            </div>
                          )}
                          
                          {/* Stock Badge */}
                          <div className="absolute top-3 right-3">
                            {product.stock > 0 ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                In Stock: {product.stock}
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          {/* Brand */}
                          {product.brand && (
                            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">
                              {product.brand}
                            </span>
                          )}
                          
                          {/* Title */}
                          <h3 className="font-medium text-lg text-gray-800 mt-1">
                            {product.name || 'Unnamed Product'}
                          </h3>
                          
                          {/* Description */}
                          {product.description && (
                            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          
                          {/* Price and Action */}
                          <div className="mt-4 flex items-center justify-between">
                            {product.price !== undefined && (
                              <p className="text-xl font-semibold text-orange-600">
                                ${product.price.toLocaleString()}
                              </p>
                            )}
                            
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  selectedItem && <p className="text-gray-500">No products available in this category.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}