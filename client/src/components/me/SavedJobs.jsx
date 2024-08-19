import { motion } from "framer-motion";
import React, { Suspense, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import JobCard from "../cards/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setProgress } from "@/redux/progress/progressSlice";
import { baseUrl } from "@/utils";
import Pagination from "../shared/Pagination";

const SavedJobs = () => {
  const [ searchParams ] = useSearchParams()

  const [results, setResults] = React.useState(null);
  const userId = useSelector(state => state.user.id)

  const page = searchParams.get("page") || 1;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        dispatch(setProgress(50));
        const res = await fetch(`${baseUrl}job/fetchMyJobs?type=savedJobs&userId=${userId}&page=${page}`);
        const data = await res.json();
        if (data.success) {
          setResults(data);
        } else {
          setResults(null);
        }
        dispatch(setProgress(100));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <motion.div
      initial={{ y: "20px", opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "linear", duration: 0.3 }}
      className="flex flex-col py-4"
    >
      <p className="text-wxl font-semibold tracking-tighter pb-4">Your Saved Jobs</p>
      {results?.myJobs && results.myJobs.length === 0 && <p className="text-sm font-light">You have saved {results.totalPages*8} jobs</p>}

      <div className="jobCardContainer grid items-center grid-cols-1 md:grid-cols-2 min-h-[50vh]">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center ">
              <PacmanLoader />
            </div>
          }
        >
          {results?.jobs &&
            results.jobs.length > 0 &&
            results.jobs.map((job, index) => {
              return <JobCard key={index} job={job} />;
            })}
        </Suspense>
      </div>
      {results?.totalPages > 0 && <Pagination totalPages={results?.totalPages} />}
    </motion.div>
  );
};

export default SavedJobs;
