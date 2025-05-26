import logo from '../../assets/logosalte.jpg'
import person from '../../assets/person.png'
import cart from '../../assets/cart.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Main Navbar Container */}
            <div className="w-full flex flex-col md:flex-row h-auto md:h-16 lg:h-20">
                {/* Left Side - Logo, Profile, Cart, Search */}
                <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center px-4 py-2 md:py-0">
                    {/* Logo */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <img src={logo} alt="Logo" className="h-10 md:h-12 lg:h-14" />
                        
                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>

                    {/* Profile and Cart Icons - Hidden on mobile unless menu is open */}
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-row items-center justify-center w-full md:w-auto py-2 md:py-0`}>
                        <div className="flex flex-col items-center justify-center h-12 md:h-16 w-16 md:w-20 cursor-pointer">
                            <img 
                                src={person} 
                                alt="Profile" 
                                className="w-6 md:w-7 h-6 md:h-7 transition-transform transform hover:scale-110 duration-300" 
                            />
                            <p className="text-xs md:text-sm transition-transform transform hover:scale-110 duration-300">Profile</p>
                        </div>
                        <div onClick={()=>navigate('/MyCart')} className="flex flex-col items-center justify-center h-12 md:h-16 w-16 md:w-20 cursor-pointer">
                            <img
                                src={cart}
                                alt="Cart"
                                className="w-6 md:w-7 h-6 md:h-7 transition-transform transform hover:scale-110 duration-300"
                            />
                            <p className="text-xs md:text-sm transition-transform transform hover:scale-110 duration-300">Cart</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-[250px] lg:w-[300px] h-8 md:h-10 items-center rounded-full overflow-hidden bg-white shadow-lg p-1 my-2 md:my-0 md:ml-auto md:mr-4 lg:mr-6`}>
                        <input
                            type="text"
                            name="text"
                            placeholder="t-back panties"
                            className="flex-grow px-2 md:px-3 text-gray-700 focus:outline-none font-bold cursor-pointer text-xs md:text-sm"
                        />
                        <button className="cursor-pointer flex items-center justify-center bg-orange-500 text-white px-2 md:px-3 py-1 w-16 md:w-20 h-full rounded-full text-xs md:text-sm">
                            Search
                        </button>
                    </div>
                </div>

                {/* Right Side - Professional Black Section */}
                <div className="w-full md:w-1/2 bg-black">
                    {/* Mobile black navbar (collapses) */}
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col space-y-1 py-3 px-6`}>
                        <a href="#" className="text-gray-300 hover:text-white text-sm font-medium flex items-center py-2 transition duration-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Shop or Products
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white text-sm font-medium flex items-center py-2 transition duration-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Deals / Offers
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white text-sm font-medium flex items-center py-2 transition duration-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            About Us
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white text-sm font-medium flex items-center py-2 transition duration-200">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact Us
                        </a>
                    </div>
                    
                    {/* Desktop black navbar */}
                    <div className="hidden md:flex items-center justify-center h-full">
                        <div className="flex items-center space-x-6 lg:space-x-8 px-4">
                            <a href="#" className="text-gray-300 hover:text-white flex items-center py-4 border-b-2 border-transparent hover:border-white text-xs font-medium transition duration-200">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Shop or Products
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white flex items-center py-4 border-b-2 border-transparent hover:border-white text-xs font-medium transition duration-200">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Deals / Offers
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white flex items-center py-4 border-b-2 border-transparent hover:border-white text-xs font-medium transition duration-200">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                About Us
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white flex items-center py-4 border-b-2 border-transparent hover:border-white text-xs font-medium transition duration-200">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}