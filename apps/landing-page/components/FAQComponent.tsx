import { useState } from "react";

interface FaqItem {
    question: string;
    answer: string;
}

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs: FaqItem[] = [
        {
            question: "What is Make My Menu ?",
            answer: "Make My Menu is a free platform for restaurant owners to create and manage their menus online."
        },
        {
            question: "Is Make My Menu free to use ?",
            answer: "Yes Make My Menu is absolutely free to use."
        },
        {
            question: "How does Make My Menu help restuarant owners ?",
            answer: "Restaurant Owners can create an online menu by choosing a template and then generating menus."
        },
        {
            question: "Why should I use Make My Menu ?",
            answer: "Make My Menu is a free platform that allows restaurant owners to create and manage their menus online."
        },
        {
            question: "Is Make My Menu hard to use ?",
            answer: "No, Make My Menu's interface is user-friendly and easy to use."
        },

    ];

    const toggleFaq = (index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if the same question is clicked again
        } else {
            setActiveIndex(index); // Open the clicked question
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-16">
            <h1 className="text-3xl font-bold text-center mb-6 text-[#1a1a1a] dark:text-[white]">Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300 py-4 my-3 bg-[white] dark:bg-gray-900 px-3">
                    <button
                        onClick={() => toggleFaq(index)}
                        className="flex justify-between items-center w-full text-left text-[17px] font-medium text-gray-800 dark:text-[white]"
                    >
                        {faq.question}
                        <span className={`transform transition-transform ${activeIndex === index ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </button>
                    {activeIndex === index && (
                        <p className="my-4 text-gray-600 dark:text-[#9c9a9a] text-[15px]">
                            {faq.answer}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Faq;
