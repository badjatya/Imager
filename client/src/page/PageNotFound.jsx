import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="mx-auto h-[100%]">
            <div className="flex flex-col items-center">
                <Link to="/">
                    <img src={logo} alt="logo" className="w- object-contain" />
                </Link>

                <h1 className="mt-12 mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
                    Page not found
                </h1>

                <p className="mb-12 text-center text-gray-500 md:text-lg">
                    The page you’re looking for doesn’t exist.
                </p>

                <Link
                    to="/"
                    className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
                >
                    Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
