import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";
import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get("jobTitle")
  const location = searchParams.get("location")

  const results =
    jobTitle && location
      ? `Showing results for ${jobTitle} in ${location}`
      : null;

  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      exit={{ y: "20px" }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="w-full pt-6 flex flex-col items-left gap-4 max-sm:px-4"
    >
      <div className="text-2xl font-bold">Your Search Results.</div>

      <div className="max-lg:w-full w-3/4 pt-2">
        <Searchbar />
      </div>

      <div className="resultContainer relative w-full rounded-md min-h-[30vh] grid items-center grid-cols-1 md:grid-cols-2">
        <Suspense
          fallback={
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-300/40 p-2 rounded-md animate-pulse">
              Loading...
            </div>
          }
        >
          <>
            {" "}
            {results ? (
              <>
                {/* {results.map((job, index) => {
                  return <JobCard key={index} job={job} />;
                })} */}
                {results}
              </>
            ) : (
              <div className="absolute top-0 left-0 ml-2">Enter Something to search.</div>
            )}
          </>
        </Suspense>
      </div>
      {results && <Pagination />}
    </motion.div>
  );
};

export default Search;
