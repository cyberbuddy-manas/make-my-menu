import { FaBeer, FaCoffee, FaApple, FaCar, FaBicycle, FaBolt } from "react-icons/fa";

interface Item {
    icon: JSX.Element;
    heading: string;
    paragraph: string;
}

const items: Item[] = [
    {
        icon: <FaBeer size={40} />,
        heading: "Easy To Use",
        paragraph: "Intuitive design allows restuarant owners to create and manage their menus"
    },
    {
        icon: <FaCoffee size={40} />,
        heading: "Customizable Templates",
        paragraph: "Choose a variety of templates to suit your restaurant's brand and style"
    },
    {
        icon: <FaApple size={40} />,
        heading: "Interactive Menu Items",
        paragraph: "Add descriptions, ingredients, and images to your menu items"
    },
    {
        icon: <FaCar size={40} />,
        heading: "Menu Analytics",
        paragraph: "Gain valuable insights about your menu items and customer preferences"
    },
    {
        icon: <FaBicycle size={40} />,
        heading: "Integration",
        paragraph: "Connect menus to popular food delivery platforms across India"
    },
    {
        icon: <FaBolt size={40} />,
        heading: "Free To Use",
        paragraph: "Make my menu is free to use for all restaurant owners"
    }
];

const SecondComponent: React.FC = () => {
    return (
        <div className="max-w-[1300px] mx-auto mt-16">
            <h2 className="text-3xl font-semibold text-center text-[#1a1a1a] dark:text-white my-8">Features</h2>

            <div className="flex justify-center items-center gap-10 flex-wrap px-4">
                {items.map((item, index) => (
                    <div className="px-4 py-8 shadow-md rounded-md bg-[white] hover:scale-110 transition-transform cursor-pointer dark:bg-gray-900 text-center max-w-[360px]" key={index}>
                        {/* <div className="flex justify-center mb-4 text-blue-500">{item.icon}</div> */}
                        <h3 className="text-lg font-semibold mb-2 text-[#1a1a1a] dark:text-white">{item.heading}</h3>
                        <p className="text-center text-[#414040] dark:text-[whitesmoke]">{item.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecondComponent;
