import { useState } from "react";

interface FaqItem {
    question: string;
    answer: string;
}

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState < number | null > (null);

    const faqs: FaqItem[] = [
        {
            question: "What is Next.js?",
            answer: "Next.js is a React framework that enables server-side rendering and static website generation."
        },
        {
            question: "What is Tailwind CSS?",
            answer: "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs."
        },
        {
            question: "How does server-side rendering work?",
            answer: "Server-side rendering renders the webpage on the server, improving SEO and performance."
        },
        {
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces."
        },
        {
            question: "What is the benefit of static site generation?",
            answer: "Static site generation allows pre-rendering pages at build time, improving load speed."
        },
        {
            question: "How do I install Next.js?",
            answer: "You can install Next.js by running `npx create-next-app` in your terminal."
        }
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
                        <p className="my-4 text-gray-600 dark:text-[#9c9a9a]">
                            {faq.answer}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Faq;
