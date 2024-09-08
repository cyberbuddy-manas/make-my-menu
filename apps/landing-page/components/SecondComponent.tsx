import { FaBeer, FaCoffee, FaApple, FaCar, FaBicycle, FaBolt } from "react-icons/fa";

interface Item {
    icon: JSX.Element;
    heading: string;
    paragraph: string;
}

const items: Item[] = [
    {
        icon: <FaBeer size={40} />,
        heading: "For Functional App Sites",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor"
    },
    {
        icon: <FaCoffee size={40} />,
        heading: "High-quality Design",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor"
    },
    {
        icon: <FaApple size={40} />,
        heading: "Essential Integrations",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor"
    },
    {
        icon: <FaCar size={40} />,
        heading: "Essential Components",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor"
    },
    {
        icon: <FaBicycle size={40} />,
        heading: "Fully Customizable",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor"
    },
    {
        icon: <FaBolt size={40} />,
        heading: "Regular Free Updates",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor"
    }
];

const SecondComponent: React.FC = () => {
    return (
        <div className="max-w-[1300px] mx-auto mt-16">
            <h2 className="text-3xl font-semibold text-center text-[#1a1a1a] dark:text-white my-8">Features</h2>

            <div className="flex justify-center items-center gap-10 flex-wrap px-4">
                {items.map((item, index) => (
                    <div className="px-4 py-8 shadow-md rounded-md bg-[white] hover:scale-110 transition-transform cursor-pointer dark:bg-gray-900 text-center max-w-[360px]" key={index}>
                        <div className="flex justify-center mb-4 text-blue-500">{item.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a] dark:text-white">{item.heading}</h3>
                        <p className="text-center text-[#414040] dark:text-[whitesmoke]">{item.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecondComponent;
