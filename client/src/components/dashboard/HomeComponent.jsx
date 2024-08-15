import { jobs } from "@/utils";
import { motion } from "framer-motion";
import React from "react";
import JobCard from "../cards/JobCard";
import Pagination from "../shared/Pagination";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HomeComponent = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const token = localStorage.getItem("token");
  if(!token) return null;
  const user = jwtDecode(token)
  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      transition={{ ease: "linear", duration: 0.3 }}
      className=" w-full flex flex-col justify-between min-h-[90vh] pt-6 max-sm:px-1"
    >
      <div className="flex flex-col justify-start">
        <div className="intro pb-4 px-2">
          <h1 className="text-xl font-bold">Welcome {user.name.split(' ')[0]}</h1>
          <p className="font-light text-sm md:w-3/4">
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
