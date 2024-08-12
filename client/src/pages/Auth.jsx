import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";

const About = () => {
  const location = useLocation();
  const theme = useSelector((state) => state.theme.value);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user && user.isVerified) navigate("/dashboard");
    else if (user && !user.isVerified) navigate("/auth/onboarding");
  }, []);

  return (
    <div
      className={` ${
        theme === "dark" && "bg-zinc-900 text-white"
      } w-screen min-h-[100dvh] font-gupter flex flex-col`}
    >
      <Navbar otherClasses={"relative"}>
        {location.pathname === "/auth/register" ? (
          <Link to="/auth" className="auth-button">
            Log In
          </Link>
        ) : (
          <Link to="/auth/register" className="auth-button">
            Sign Up
          </Link>
        )}
      </Navbar>
      <div className="flex flex-col items-center justify-center flex-1 relative">
        {redirect && (
          <div className="banner w-full px-2 py-2 absolute top-0 bg-gray-500/30 transition-all duration-300 font-light italic text-sm">
            <p className="">You need to login first to perform this action.</p>
            <Link
              to="/auth"
              className="absolute top-0 right-0 p-2 px-4 cursor-pointer hover:font-semibold transition-all duration-300 hover:drop-shadow-[0_0_20px_black]"
            >
              x
            </Link>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default About;
