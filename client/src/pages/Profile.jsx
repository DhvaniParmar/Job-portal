import { motion } from "framer-motion";
import React from "react";

const Profile = () => {
  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      exit={{ y: "20px" }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="w-full pt-6"
    >
      Profile
    </motion.div>
  );
};

export default Profile;
