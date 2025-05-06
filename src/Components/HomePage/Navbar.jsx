import logo from '../../assets/logosalte.jpg'
import person from '../../assets/person.png'
import cart from '../../assets/cart.png'
import { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Main Navbar Container */}
            <div className="w-full flex flex-col md:flex-row">
                {/* Left Side - Logo, Profile, Cart, Search */}
                <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center px-4">
                    {/* Logo */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <img src={logo} alt="Logo" className="h-16 md:h-20 lg:h-[100px]" />
                        
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
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-row items-center justify-center w-full md:w-auto`}>
                        <div className="flex flex-col items-center justify-center h-[80px] md:h-[100px] w-[80px] md:w-[100px] cursor-pointer">
                            <img 
                                src={person} 
                                alt="Profile" 
                                className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] transition-transform transform hover:scale-110 duration-300" 
                            />
                            <p className="text-sm md:text-base transition-transform transform hover:scale-110 duration-300">Profile</p>
                        </div>
                        <div className="flex flex-col items-center justify-center h-[80px] md:h-[100px] w-[80px] md:w-[100px] cursor-pointer">
                            <img
                                src={cart}
                                alt="Cart"
                                className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] transition-transform transform hover:scale-110 duration-300"
                            />
                            <p className="text-sm md:text-base transition-transform transform hover:scale-110 duration-300">Cart</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-[300px] lg:w-[400px] h-[50px] md:h-[60px] items-center rounded-full overflow-hidden bg-white shadow-lg p-1 my-4 md:ml-auto md:mr-4 lg:mr-10`}>
                        <input
                            type="text"
                            name="text"
                            placeholder="t-back panties"
                            className="flex-grow px-2 md:px-4 text-gray-700 focus:outline-none font-bold cursor-pointer text-sm md:text-base"
                        />
                        <button className="cursor-pointer flex items-center justify-center bg-orange-500 text-white px-2 md:px-4 py-2 w-[100px] md:w-[150px] h-full rounded-full text-sm md:text-base">
                            Search
                        </button>
                    </div>
                </div>

                {/* Right Side - Black Section */}
                <div className="w-full md:w-1/2 bg-black h-16 md:h-auto">
                    {/* Content for the black section */}
                </div>
            </div>
        </>
    );
}