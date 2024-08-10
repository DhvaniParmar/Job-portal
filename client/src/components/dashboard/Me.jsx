import { motion } from "framer-motion";
import React from "react";

const Me = () => {
  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="pt-6 w-full flex flex-col items-left gap-4 max-sm:px-4"
    >
      <p className="text-2xl font-bold">Your Jobs</p>
    </motion.div>
  );
};

export default Me;
