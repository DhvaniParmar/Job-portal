import { jobs } from "@/utils";
import { motion } from "framer-motion";
import React, { useDebugValue } from "react";
import JobCard from "../cards/JobCard";
import Pagination from "../shared/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HomeComponent = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = jwtDecode(token);
  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      transition={{ ease: "linear", duration: 0.3 }}
      className=" w-full flex flex-col justify-between min-h-[90vh] pt-6 max-sm:px-1 relative"
    >
      <Link to='/dashboard/post-job' title="Post a Job" className=" p-4 rounded-full sticky w-12 h-12 flex items-center justify-center aspect-square top-[85%] left-[80%] z-50 border border-gray-600/40  bg-gradient-to-br md:hover:animate-bounce from-blue-500/80 to-blue-800/50 text-md font-semibold transition-all duration-500 border-blue-700 hover:shadow-[0_0_25px_blue] shadow-blue-600/70 group backdrop-blur-md"><span className="group-hover:font-bold group-hover:scale-125 transition-all duration-500">+</span></Link>
      <div className="flex flex-col justify-start">
        <div className="intro pb-4 px-2">
          <h1 className="text-3xl font-bold capitalize">
            Welcome {user.name.split(" ")[0]}
          </h1>
            <p className="font-extralight text-sm">
              Explore endless opportunities through our immersive job search and
              connect to like minded individuals. Check out the latest job
              postings from our partners.
            </p>
        </div>

        <div className="grid max-xl:grid-cols-1 grid-cols-2 place-content-start gap-4 p-4">
          {jobs.map((job, index) => {
            return <JobCard key={index} job={job} />;
          })}
          {jobs.map((job, index) => {
            return <JobCard key={index} job={job} />;
          })}
        </div>
      </div>

      <Pagination />
    </motion.div>
  );
};

export default HomeComponent;
