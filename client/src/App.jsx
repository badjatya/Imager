import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Layout";
import { Home, CreatePost, Signup, Login, PageNotFound } from "./page";

const App = () => {
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

    return (
        <BrowserRouter>
            <Navbar />
            <Toaster />
            <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {user.token ? (
                        <>
                            <Route
                                path="/create-post"
                                element={<CreatePost />}
                            />
                            <Route
                                path="/signup"
                                element={<Navigate to="/" replace />}
                            />
                            <Route
                                path="/login"
                                element={<Navigate to="/" replace />}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/create-post"
                                element={<Navigate to="/login" replace />}
                            />
                        </>
                    )}
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
                {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes> */}
            </main>
        </BrowserRouter>
    );
};

export default App;
