import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 dark:text-[white]">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="text-teal-600 flex items-center gap-3">
                            <div> <img src="/logo.png" alt="" className='jump2' /></div>
                            <div className='text-[#1a1a1a] dark:text-[white] text-[20px] font-bold'>Make My Menu</div>
                        </div>

                        <p className="mt-4 max-w-xs text-gray-500 dark:text-[whitesmoke]">
                            Innovative solution designed to empwer restaurant owners
                        </p>

                        <div className='flex items-center my-6 gap-3'>
                            <div className='text-[25px] text-[#1a1a1a] dark:text-[white]'><a href='#'><FaFacebook /></a></div>
                            <div className='text-[25px] text-[#1a1a1a] dark:text-[white]'><a href='#'><FaTwitter /></a></div>
                            <div className='text-[25px] text-[#1a1a1a] dark:text-[white]'><a href='#'><FaReddit /></a></div>
                            <div className='text-[25px] text-[#1a1a1a] dark:text-[white]'><a href='#'><FaDiscord /></a></div>
                            <div className='text-[25px] text-[#1a1a1a] dark:text-[white]'><a href='#'><AiFillInstagram /></a></div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">


                        <div>
                            <p className="font-medium text-gray-900">Company</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> About </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Meet the Team </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Accounts Review </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Helpful Links</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Contact </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> FAQs </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Live Chat </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Legal</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Accessibility </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Returns Policy </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Refund Policy </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Hiring Statistics </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Services</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> 1on1 Coaching </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Company Review </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> Accounts Review </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> HR Consulting </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-[white] transition hover:opacity-75"> SEO Optimisation </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500">&copy; 2024. Company Name. All rights reserved.</p>
            </div>
        </footer>

    );
}

export default Footer;
