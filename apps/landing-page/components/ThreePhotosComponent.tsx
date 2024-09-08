import React from 'react';

const ThreePhotosComponent: React.FC = () => {
    return (
        <div className="flex justify-center items-center gap-8 my-10 flex-wrap px-3">
            <img className="md:w-[350px] hover:scale-105 transition-transform cursor-pointer" src="/1.webp" alt="Photo 1" />
            <img className="md:w-[350px] hover:scale-105 transition-transform cursor-pointer" src="/2.webp" alt="Photo 2" />
            <img className="md:w-[350px] hover:scale-105 transition-transform cursor-pointer" src="/3.webp" alt="Photo 3" />
        </div>
    );
}

export default ThreePhotosComponent;
