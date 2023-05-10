import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!email) {
            return toast.error("Email is required", {
                position: "top-center",
            });
        } else if (!password) {
            return toast.error("Password is required", {
                position: "top-center",
            });
        } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            return toast.error("Email is invalid", {
                position: "top-center",
            });
        } else if (password && password.length < 7) {
            return toast.error("Password must be at least 7 characters", {
                position: "top-center",
            });
        }

        setLoading(true);
        const user = { email, password };
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );

            const data = await response.json();
            console.log(data);
            if (data.success) {
                toast.success("Logged in successfully!", {
                    position: "top-center",
                });
                const token = data.token;
                const user = { ...data.user, token };
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            toast.error(err, {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                Login
            </h2>

            <form
                className="mx-auto max-w-lg rounded-lg border"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-4 p-4 md:p-8">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />
                    </div>

                    <button
                        type="submit"
                        className="block rounded-lg bg-[#6469ff] px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100  focus-visible:ring  md:text-base mt-4"
                    >
                        Login
                    </button>
                </div>

                <div className="flex items-center justify-center p-4 pt-0">
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
