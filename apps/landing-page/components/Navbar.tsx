import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoMoonOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Check if dark mode is already enabled in localStorage
        const darkModeSetting = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(darkModeSetting);
        if (darkModeSetting) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle menu on hamburger click
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    };

    return (
        <nav className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Left: Logo */}
                <div className="flex-shrink-0 md:ml-10">
                    <Link href="/" className="text-2xl font-bold flex items-center gap-3">
                        <div><img className='jump2' src="/logo.png" alt="" height={40} width={40} /></div>
                        <div className='text-[#1a1a1a] dark:text-[white]'>Make My Menu</div>
                    </Link>
                </div>

                {/* Middle: Pages */}
                <div className="hidden md:flex space-x-8">
                    <Link href="/" className='hover:text-[#6f6fde]'>
                        Features
                    </Link>
                    <Link href="/" className='hover:text-[#6f6fde]'>
                        About
                    </Link>
                    <Link href="/" className='hover:text-[#6f6fde]'>
                        How It works
                    </Link>
                    <Link href="/" className='hover:text-[#6f6fde]'>
                        Support
                    </Link>
                </div>

                {/* Right: Dark Mode and Auth Links */}
                <div className="hidden md:flex space-x-6 md:mr-10 items-center">
                    <div className='text-[23px] cursor-pointer' onClick={toggleDarkMode}>
                        {isDarkMode ? <LuSun /> : <IoMoonOutline />}
                    </div>

                    <Link href="/">
                        Sign In
                    </Link>
                    <Link href="/" className='bg-blue-500 px-3 py-1.5 rounded-md text-white font-bold active:scale-90 hover:scale-110 transition-transform'>
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="flex gap-3 md:hidden">
                    <div className='text-[23px] cursor-pointer' onClick={toggleDarkMode}>
                        {isDarkMode ? <LuSun /> : <IoMoonOutline />}
                    </div>

                    <button className="text-[black] dark:text-white focus:outline-none" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="mt-5">
                    <div className="text-center my-2">
                        <Link href="/">Home</Link>
                    </div>
                    <div className="text-center my-2">
                        <Link href="/">About</Link>
                    </div>
                    <div className="text-center my-2">
                        <Link href="/">Services</Link>
                    </div>
                    <div className="text-center my-2">
                        <Link href="/">Sign In</Link>
                    </div>
                    <div className="text-center my-2">
                        <Link href="/">Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
