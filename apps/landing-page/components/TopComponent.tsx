import React from 'react';
import { TfiAndroid } from "react-icons/tfi";
import { AiFillYoutube } from "react-icons/ai";

const TopComponent: React.FC = () => {
    return (
        <div className="md:flex md:gap-10 items-center justify-center mt-5 md:px-6 px-4">
            <div>
                <div className="text-4xl font-bold my-3 text-[#1a1a1a] dark:text-white">
                    Welcome to <span className="text-red-500 dark:text-red-400 text-[40px] ">Make My Menu</span>
                </div>




                <div className="text-lg my-4 text-[#414040] dark:text-[whitesmoke]">
                    Innovative solution designed to empwer restaurant owners
                </div>
                <p className="max-w-[600px] my-2 text-[#414040] dark:text-[whitesmoke]">
                    Equip restuarant owners with powerful tool that simplifies the process of creating and managing digital menus
                </p>

                <div className="flex items-center my-10 gap-5 flex-wrap">
                    <button className="jump bg-green-500 px-4 py-2 rounded-md text-white flex items-center space-x-2 transition-transform active:scale-95 hover:scale-110">
                        <TfiAndroid />
                        <span className="font-bold md:text-[18px] text-[13px]">Download App</span>
                    </button>

                    <button className="jump bg-red-500 px-4 py-2 rounded-md text-white flex items-center space-x-2 transition-transform active:scale-95 hover:scale-110">
                        <AiFillYoutube />
                        <span className="font-bold md:text-[18px] text-[13px]">Watch Demo</span>
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <img className="md:w-[450px] md:px-0" src="/menu.png" alt="Menu" />
            </div>
        </div>
    );
}

export default TopComponent;
