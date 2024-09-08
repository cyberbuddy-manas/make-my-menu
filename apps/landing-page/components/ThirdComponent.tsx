import React from 'react';

const ThirdComponent: React.FC = () => {
    return (
        <div className="md:flex md:gap-16 items-center justify-center md:mt-16 mt-5 md:px-6 px-4">
            <div className="flex justify-center md:mb-0 mb-10">
                <img className="md:w-[450px] md:px-0" src="/qr-menu.png" alt="QR Menu" />
            </div>

            <div>
                <div className="text-2xl font-bold dark:text-blue-500">Track Audience Activities</div>
                <div className="text-4xl font-bold my-3 text-[#1a1a1a] dark:text-white">
                    Welcome to <span className="text-red-500 dark:text-red-400 text-[40px]">MENU MAKERS</span>
                </div>
                <div className="text-lg my-4 text-[#414040] dark:text-[whitesmoke]">
                    This is a simple website built with Next.js
                </div>
                <p className="max-w-[600px] my-2 text-[#414040] dark:text-[whitesmoke]">
                    Schedule your posts for times when your audience is most active. Choose from our best-time predictions, or create your own publishing schedule.
                </p>

                <ul className="space-y-4 text-left text-[#414040] dark:text-gray-400">
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span>Individual configuration</span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span>No setup, or hidden fees</span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span>Team size: <span className="font-semibold text-gray-900 dark:text-white">1 developer</span></span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span>Premium support: <span className="font-semibold text-gray-900 dark:text-white">6 months</span></span>
                    </li>
                    <li className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span>Free updates: <span className="font-semibold text-gray-900 dark:text-white">6 months</span></span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ThirdComponent;
