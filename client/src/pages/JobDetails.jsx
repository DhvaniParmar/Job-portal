import { motion } from 'framer-motion'
import React from 'react'

const JobDetails = () => {
  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      exit={{ y: "20px" }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="w-full pt-6 flex flex-col items-left gap-4 max-sm:px-4"
    >
      Job Details 
    </motion.div>
  )
}

export default JobDetails
