import { useEffect, useState } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState({});

    // To check user logged in
    useEffect(() => {
        function handleStorageChange() {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                console.log(
                    "User data retrieved from local storage:",
                    JSON.parse(storedUser)
                );
            } else {
                setUser({});
            }
        }

        handleStorageChange();

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    // To logout
    function logoutUser() {
        localStorage.removeItem("user");
        setUser({});
        window.location.reload();
    }
    return (
        <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
            <Link to="/">
                <img src={logo} alt="logo" className="w-48 object-contain" />
            </Link>
            <div className="flex gap-4">
                {user.token ? (
                    <>
                        <Link
                            to="/create-post"
                            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
                        >
                            Create
                        </Link>
                        <button
                            onClick={logoutUser}
                            className="font-inter font-medium bg-white text-[#6469ff] border border-[#6469ff] px-4 py-2 rounded-md ml-4"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;

{
    /* <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
            <Link to="/">
                <img src={logo} alt="logo" className="w-48 object-contain" />
            </Link>

            <Link
                to="/create-post"
                className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
            >
                Create
            </Link>
        </header> */
}
