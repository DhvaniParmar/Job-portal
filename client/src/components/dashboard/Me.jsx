import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Me = () => {
  const user = useSelector((state) => state.user);  

  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="pt-6 w-full flex flex-col items-left gap-4 max-sm:px-4"
    >
      <p className="text-2xl font-bold">Your Jobs</p>
      <div className="flex bg-gry-800/30 md:mx-4 lg:mx-2 px-2 rounded-md justify-between items-center font-bold">
        <Link to="/dashboard/me" className="w-1/2 flex justify-center hover-effect relative py-2 before:h-[1px]">Saved Jobs</Link>
        <div className="border mx-2 border-black py-4 w-[1px] h-full shadow-[0_0_30px_gray]"></div>
        {user.role === "Applicant" ? (
          <Link to="appliedJobs" className="w-1/2 flex justify-center hover-effect relative py-2 before:h-[1px]">Applied Jobs</Link>
        ) : (
          <Link to="postedJobs" className="w-1/2 flex justify-center hover-effect relative py-2 before:h-[1px]">Posted Jobs</Link>
        )}
      </div>
      <Outlet />
    </motion.div>
  );
};

export default Me;
