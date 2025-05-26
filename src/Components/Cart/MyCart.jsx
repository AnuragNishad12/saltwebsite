import { useEffect, useState } from "react";
import { useToast } from '../ToastComponents/ToastProvider.jsx';
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState(new Set());

  // Currency formatting helper
  const formatCurrency = (value) => {
    const number = parseFloat(value) || 0;
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/api/GetCartItems', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch cart');
        
        const data = await response.json();
        setCart(data.items?.map(item => ({
          ...item,
          product: {
            ...item.product,
            price: parseFloat(item.product?.price) || 0,
            images: item.product?.images || []
          }
        })) || []);
      } catch (error) {
        console.error('Cart fetch error:', error);
        toast.error(error.message || "Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleRemoveItem = async (productId) => {
    const previousCart = [...cart];
    try {
      setRemovingItems(prev => new Set([...prev, productId]));
      setCart(prev => prev.filter(item => item._id !== productId));

      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/CartDELETE/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item');
      }
      
      toast.success("Item removed successfully");
    } catch (error) {
      setCart(previousCart);
      toast.error(error.message || "Failed to remove item");
      console.error('Removal error:', error);
    } finally {
      setRemovingItems(prev => new Set([...prev].filter(id => id !== productId)));
    }
  };

  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setCart(prev => prev.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ));

      const token = localStorage.getItem("token");
     let res =  await fetch(`http://localhost:5000/api/updateQuantity/${itemId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      let data = await res.json();
      
      if(res.ok){
         console.log(data);
        
      }else{
        toast.error(data.message)
          navigate("/Login")
      }



    } catch (error) {
      console.error('Quantity update error:', error);
      toast.error("Failed to update quantity");
    }
  };

   const decreaseQantity = async(itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      // Update local state first for immediate UI feedback
      setCart(prev => prev.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ));

      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/decreaseQuantity/${itemId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      const data = await res.json();
      
      if (res.ok) {
        console.log(data);
      } else {
        // Revert the local state change if API call failed
        setCart(prev => prev.map(item => 
          item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
        toast.error(data.message || "Failed to decrease quantity");
        navigate("/Login");
      }
    } catch (error) {
      // Revert the local state change if there's an exception
      setCart(prev => prev.map(item => 
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ));
      console.log(`Exception Problem ${error}`);
      toast.error("Failed to decrease quantity");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
          <p className="text-orange-600 text-sm font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-6">
      <div className="max-w-5xl mx-auto px-3">
        {/* Cart Header */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-t-3 border-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 p-2 rounded-full">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">My Shopping Cart</h1>
                <p className="text-gray-600 text-sm">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
              </div>
            </div>
            {cart.length > 0 && (
              <div className="text-right">
                <p className="text-xs text-gray-600">Subtotal</p>
                <p className="text-lg font-bold text-orange-600">{formatCurrency(calculateSubtotal())}</p>
              </div>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 text-sm mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300 border border-orange-100 ${
                    removingItems.has(item._id) ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-orange-100">
                        <img
                          src={item.product?.images?.[0] || '/placeholder-image.jpg'}
                          alt={item.product?.name || 'Product image'}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                          {item.product?.name || 'Unnamed Product'}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                          disabled={removingItems.has(item._id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-bold text-orange-600">
                          {formatCurrency(item.product?.price)}
                        </div>
                        <div className="text-xs text-gray-500">Per item</div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600 text-sm font-medium">Quantity:</span>
                          <div className="flex items-center border border-orange-200 rounded-md">
                            <button
                              onClick={() => decreaseQantity(item._id, item.quantity - 1)}
                              className="p-1 hover:bg-orange-50 transition-colors duration-200 text-orange-600"
                              disabled={item.quantity <= 1 || removingItems.has(item._id)}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-800 min-w-10 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityUpdate(item._id, item.quantity + 1)}
                              className="p-1 hover:bg-orange-50 transition-colors duration-200 text-orange-600"
                              disabled={removingItems.has(item._id)}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-lg font-bold text-gray-800">
                            {formatCurrency((item.product?.price || 0) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-orange-100">
                    <button
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-1"
                      disabled={removingItems.has(item._id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span>Order Now</span>
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="flex-1 bg-white border-2 border-red-200 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-50 hover:border-red-300 transition-all duration-300 flex items-center justify-center space-x-1"
                      disabled={removingItems.has(item._id)}
                    >
                      {removingItems.has(item._id) ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-4 sticky top-6 border border-orange-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Tax</span>
                    <span>{formatCurrency(calculateSubtotal() * 0.1)}</span>
                  </div>
                  <div className="border-t border-orange-100 pt-2">
                    <div className="flex justify-between text-base font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-orange-600">
                        {formatCurrency(calculateSubtotal() * 1.1)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium text-base hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md mb-3">
                  Proceed to Checkout
                </button>

                <button className="w-full bg-white border-2 border-orange-200 text-orange-600 py-2 px-4 rounded-lg font-medium text-sm hover:bg-orange-50 transition-all duration-300">
                  Continue Shopping
                </button>

                {/* Security Badge */}
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center space-x-1 text-orange-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Your payment information is protected</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;