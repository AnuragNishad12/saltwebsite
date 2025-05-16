import { useEffect, useState, useRef } from 'react';
import { Menu } from 'lucide-react';
import { useToast } from '../ToastComponents/ToastProvider';
import { useNavigate } from 'react-router-dom';

export default function ResponsiveCategoryNavigation() {
const navigate = useNavigate();
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Price filter states
  const [priceRange, setPriceRange] = useState([100, 10000]);
  const [currentPriceRange, setCurrentPriceRange] = useState([100, 10000]);
  const [maxProductPrice, setMaxProductPrice] = useState(10000);
  const [isDragging, setIsDragging] = useState(false);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
   const [quantity, setQuantity] = useState(1);
   const[isOpen,setIsOpen]= useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://yusuf.pollai.in/api/allCategory');
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

  // Add event listeners for drag end
  useEffect(() => {
    const handleDragEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        applyPriceFilter();
      }
    };

    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) {
      setProducts([]);
      setFilteredProducts([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://yusuf.pollai.in/api/products/category/${categoryId}`);
      const data = await res.json();
       console.log("Data of products",data);
      if (data && data.success === "success") {
        const productsList = Array.isArray(data.products) ? data.products : [];
        setProducts(productsList);
        setFilteredProducts(productsList);
        
       
        if (productsList.length > 0) {
          const maxPrice = Math.max(...productsList.map(p => p.price || 0));
          const roundedMaxPrice = Math.ceil(maxPrice / 1000) * 1000; // Round to nearest thousand
          setMaxProductPrice(roundedMaxPrice > 0 ? roundedMaxPrice : 10000);
          setPriceRange([100, roundedMaxPrice > 0 ? roundedMaxPrice : 10000]);
          setCurrentPriceRange([100, roundedMaxPrice > 0 ? roundedMaxPrice : 10000]);
        }
      } else {
        console.error("Failed to load products:", data);
        setProducts([]);
        setFilteredProducts([]);
        setError("Failed to load products");
      }
    } catch (error) {
      console.error(`Error Getting products: ${error}`);
      setProducts([]);
      setFilteredProducts([]);
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
      setFilteredProducts([]);
    }
    
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const getSelectedCategoryName = () => {
    if (!selectedItem || !categories || categories.length === 0) return '';
    const selectedCategory = categories.find(cat => cat.id === selectedItem);
    return selectedCategory ? selectedCategory.name : '';
  };

  // Handle min price change
  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value <= currentPriceRange[1] - 100) { // Ensure min is at least 100 less than max
      setCurrentPriceRange([value, currentPriceRange[1]]);
      setIsDragging(true);
    }
  };

  // Handle max price change
  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= currentPriceRange[0] + 100) { // Ensure max is at least 100 more than min
      setCurrentPriceRange([currentPriceRange[0], value]);
      setIsDragging(true);
    }
  };
  
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Apply price filter
  const applyPriceFilter = () => {
    setPriceRange([...currentPriceRange]);
    if (products.length > 0) {
      const filtered = products.filter(
        product => product.price >= currentPriceRange[0] && product.price <= currentPriceRange[1]
      );
      setFilteredProducts(filtered);
    }
  };

  // Reset price filter
  const resetPriceFilter = () => {
    const newRange = [100, maxProductPrice];
    setPriceRange(newRange);
    setCurrentPriceRange(newRange);
    setFilteredProducts(products);
  };


//    function CheckTheToken(productId){
//   const token = localStorage.getItem("token");

//   if(!token){
//     toast.error("Please Login....");
//     navigate('/Login');
//   }

// alert("Product Added to the cart")
//    }

const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleOpenModal = () => {
  setIsOpen(true);
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
          <p className="mb-6 text-gray-600">
            {selectedItem 
              ? `You are currently viewing the ${getSelectedCategoryName()} section.` 
              : 'Please select a category from the navigation menu.'}
          </p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Section - Left Side */}
            {selectedItem && products.length > 0 && (
              <div className="w-full md:w-1/4 lg:w-1/5">
                <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-medium text-lg text-gray-800 mb-5">Add Filters</h3>
                  
                  {/* Price Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-4 uppercase tracking-wide">Price</h4>
                    
                    {/* Price Range Slider */}
                    <div className="mb-6">
                      <div className="relative">
                        {/* Slider Track Background */}
                        <div className="absolute w-full h-1 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2"></div>
                        
                        {/* Active Track */}
                        <div 
                          className="absolute h-1 bg-pink-500 rounded-full top-1/2 transform -translate-y-1/2" 
                          style={{
                            left: `${((currentPriceRange[0] - 100) / (maxProductPrice - 100)) * 100}%`,
                            width: `${((currentPriceRange[1] - currentPriceRange[0]) / (maxProductPrice - 100)) * 100}%`
                          }}
                        ></div>
                        
                        {/* Min Price Thumb */}
                        <div 
                          className="absolute w-4 h-4 bg-white border-2 border-pink-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md z-10 cursor-grab"
                          style={{
                            left: `${((currentPriceRange[0] - 100) / (maxProductPrice - 100)) * 100}%`
                          }}
                        ></div>
                        
                        {/* Max Price Thumb */}
                        <div 
                          className="absolute w-4 h-4 bg-white border-2 border-pink-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md z-10 cursor-grab"
                          style={{
                            left: `${((currentPriceRange[1] - 100) / (maxProductPrice - 100)) * 100}%`
                          }}
                        ></div>
                        
                        {/* Hidden Input Sliders */}
                        <input
                          type="range"
                          min={100}
                          max={maxProductPrice}
                          value={currentPriceRange[0]}
                          onChange={handleMinPriceChange}
                          className="absolute w-full opacity-0 cursor-pointer z-20 h-4"
                          style={{ touchAction: 'none' }}
                        />
                        <input
                          type="range"
                          min={100}
                          max={maxProductPrice}
                          value={currentPriceRange[1]}
                          onChange={handleMaxPriceChange}
                          className="absolute w-full opacity-0 cursor-pointer z-20 h-4"
                          style={{ touchAction: 'none' }}
                        />
                      </div>
                      
                      {/* Price Range Display */}
                      <div className="flex justify-between items-center mt-8 mb-2">
                        <div className="text-sm font-medium text-gray-700 border border-gray-200 px-3 py-1 rounded-md">
                          ₹{currentPriceRange[0]}
                        </div>
                        <div className="text-xs text-gray-400">-</div>
                        <div className="text-sm font-medium text-gray-700 border border-gray-200 px-3 py-1 rounded-md">
                          ₹{currentPriceRange[1]}+
                        </div>
                      </div>
                      
                      {/* Visual Price Label */}
                      <div className="text-center mt-1">
                        <span className="text-sm text-gray-800 font-medium">
                          ₹{currentPriceRange[0]} - ₹{currentPriceRange[1]}+
                        </span>
                      </div>
                    </div>
                    
                    {/* Filter Buttons */}
                    <div className="flex gap-2 mt-6">
                      <button 
                        onClick={applyPriceFilter}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                      >
                        Apply
                      </button>
                      <button 
                        onClick={resetPriceFilter}
                        className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Section - Right Side */}
            <div className={`w-full ${selectedItem && products.length > 0 ? 'md:w-3/4 lg:w-4/5' : 'w-full'}`}>
              {/* Products List */}
              <div className="mt-6">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading products...</p>
                  </div>
                ) : (
                  <>
                    {filteredProducts && filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
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
                                    ₹{product.price.toLocaleString()}
                                  </p>
                                )}
                                
                                <button onClick={handleOpenModal} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      selectedItem && (
                        products.length > 0 ? 
                          <p className="text-gray-500">No products match your filter criteria.</p> : 
                          <p className="text-gray-500">No products available in this category.</p>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
            
            {isOpen &&(
              <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Dialog box */}
          <div
            className="bg-white rounded-lg p-6 w-64 shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the dialog
          >
            <h3 className="text-orange-600 font-semibold text-lg mb-4 text-center">
              Select Quantity
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={decreaseQuantity}
                className="bg-orange-200 hover:bg-orange-300 text-orange-700 font-bold rounded px-3 py-1 text-lg transition-colors duration-200"
              >
                -
              </button>
              <span className="text-xl font-semibold text-orange-600">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-orange-200 hover:bg-orange-300 text-orange-700 font-bold rounded px-3 py-1 text-lg transition-colors duration-200"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                // handle add to cart with quantity here
                setIsOpen(false);
                alert(`Added ${quantity} items to cart!`);
              }}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white rounded py-2 font-medium transition-colors duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}