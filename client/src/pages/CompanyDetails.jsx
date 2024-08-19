import { motion } from 'framer-motion'
import React from 'react'
import { useParams } from 'react-router-dom'

const Company = () => {
  const { name } = useParams()
  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      exit={{ y: "20px" }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="w-full pt-6 flex flex-col items-left gap-4 max-sm:px-4"
    >
      {name} Company Details
    </motion.div>
  )
}

export default Company
