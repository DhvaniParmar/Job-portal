import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MarqueeItem from "../components/cards/MarqueeItem";
import Hero from "../components/Hero";
import { lowerMarquee, upperMarquee } from "../utils";
import { lazy } from "react";

const Navbar = lazy(() => import("../components/shared/Navbar"));
const TrendingJobs = lazy(() => import("../components/TrendingJobs"));
const CallToAction = lazy(() => import("../components/CallToAction"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Footer = lazy(() => import("../components/shared/Footer"));

const Home = () => {
  const theme = useSelector((state) => state.theme.value);
  const navigate = useNavigate()

  const user = localStorage.getItem("user");
  React.useEffect(()=>{
    if(user) navigate('/dashboard')
  },[])

  return (
    <div
      className={`min-h-[100dvh] w-full relative font-gupter overflow-x-hidden ${
        theme === "dark" && "bg-zinc-900 text-white"
      }`}
    >
      {/* Navbar */}
      <Navbar>
        <div className="flex items-center justify-end gap-6 max-lg:gap-4">
          <Link
            to="/auth"
            className={` auth-button ${theme === "dark" && "auth-button-dark"}`}
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className={` auth-button ${theme === "dark" && "auth-button-dark"}`}
          >
            Signup
          </Link>
        </div>
      </Navbar>
      <Suspense
        fallback={
          <div
            className={` ${
              theme === "dark"
                ? "bg-zinc-900"
                : "bg-gradient-to-r from-transparent to-zinc-900/30"
            } absolute inset-0 flex items-center justify-center h-screen w-screen text-5xl font-bold drop-shadow-{0_0_20px_black]`}
          >
            Loading...
          </div>
        }
      >
        <div
          className={`landing w-full ${
            theme === "dark" && "bg-zinc-900 text-white"
          }`}
        >
          {/* Call to Action */}
          <CallToAction />

          {/* Hero Section */}
          <Hero />

          {/* Marquee Section */}
          <div
            id="clients"
            className="marquee flex flex-col py-6 items-center md:text-3xl max-lg:text-xs rounded-t-lg bg-slate-900/90 shadow-[0_0_20px_gray] shadow-gray-300/40 overflow-hidden whitespace-nowrap "
          >
            <MarqueeItem images={upperMarquee} from={0} to={"-100%"} />
            <MarqueeItem images={lowerMarquee} from={"-100%"} to={0} />
          </div>

          {/* Trending Jobs Section */}
          <TrendingJobs />

          {/* Testimonials */}
          <Testimonials />

          {/* Footer */}
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
