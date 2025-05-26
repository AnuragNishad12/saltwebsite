import { useState, useEffect } from 'react';


const sliderData = [
  {
    id: 1,
    image: "https://s.alicdn.com/@sc04/kf/Hf6031479eb4d4700b6677af6564be99eP.jpg_720x720q50.jpg",
    bgColor: "bg-gray-500",
    headline: "Experience Innovation",
    subheading: "Discover our latest solutions designed for the modern world",
    ctaText: "Learn More",
  },
  {
    id: 2,
    image: "https://s.alicdn.com/@sc04/kf/Hba91291a22194c5bab8a937be99ccc09P.jpg_720x720q50.jpg",
    bgColor: "bg-yellow-800",
    headline: "Transform Your Business",
    subheading: "Leverage cutting-edge technology to drive growth",
    ctaText: "Get Started",
  },
  {
    id: 3,
    image: "https://s.alicdn.com/@sc04/kf/Hd8bd15512b7b465880cfdfc7f8f6b4daC.jpg_720x720q50.jpg",
    bgColor: "bg-[#87868B]",
    headline: "Unlock Your Potential",
    subheading: "Powerful tools to help you achieve your goals",
    ctaText: "Explore Now",
  },
];

export default function ProfessionalSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide();
      }
    }, 1000); // 1-second interval

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600); 
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600); 
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600); 
  };

  return (
    <div className="relative w-full overflow-hidden shadow-xl">

      <div className="relative h-60 md:h-100">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
          
            <div className={`absolute inset-0 ${slide.bgColor} opacity-90`}></div>
            
            
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJ3aGl0ZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9zdmc+')]"></div>
            
        
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden md:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-20"></div>
              <img 
                src={slide.image} 
                alt={`Slide ${index + 1}`} 
                className="object-cover w-full h-full"
              />
            </div>
            
        
            <div className="absolute right-0 flex flex-col justify-center w-full h-full px-6 text-white md:w-1/2 md:px-12">
              <p className="mb-2 text-xs font-bold tracking-tight md:text-3xl font-display">
                {slide.headline}
              </p>
              <p className="mb-6 text-xs md:text-xl text-white/90">
                {slide.subheading}
              </p>
              <div>
                <button className="px-6 py-3 font-medium text-white transition-all rounded bg-white/20 backdrop-blur-sm hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none">
                  {slide.ctaText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}