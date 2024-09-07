import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 dark:text-[white]">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="text-teal-600">
                            <svg className="h-8" viewBox="0 0 118 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                                <path fill="currentColor" />
                            </svg>
                        </div>

                        <p className="mt-4 max-w-xs text-gray-500 dark:text-[whitesmoke]">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam
                            molestias.
                        </p>

                        <ul className="mt-8 flex gap-6 dark:text-[whitesmoke]">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-[white] transition hover:opacity-75"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-[white] transition hover:opacity-75"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-[white] transition hover:opacity-75"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-[white] transition hover:opacity-75"
                                >
                                    <span className="sr-only">GitHub</span>
                                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-[white] transition hover:opacity-75"
                                >
                                    <span className="sr-only">Dribbble</span>
                                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
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
