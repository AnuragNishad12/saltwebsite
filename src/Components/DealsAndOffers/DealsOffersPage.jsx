import { useEffect, useState } from "react";
import { useToast } from '../ToastComponents/ToastProvider.jsx';

const DealsOffersPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/Getdeals", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();

        if (res.ok) {
          toast.success("Deals loaded successfully!");
          setDeals(data.data);
        } else {
          toast.error("Failed to load deals");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-orange-600 font-semibold">Loading Deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">🔥 Hot Deals Just for You</h1>

      {deals.length === 0 ? (
        <p className="text-center text-orange-500 text-lg font-medium">🚫 No deals available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={deal.imageUrl}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 flex flex-col justify-end text-white">
                <h2 className="text-2xl font-bold mb-1">{deal.title}</h2>
                <p className="text-sm mb-2">{deal.description}</p>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-orange-400">{deal.discountPercentage}% OFF</span>
                  <span className="text-gray-300">
                    Valid till: {new Date(deal.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DealsOffersPage;
