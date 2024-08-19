import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "@/redux/progress/progressSlice";
import { baseUrl } from "@/utils";
import { PacmanLoader } from "react-spinners";

const RightSidebar = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchSmallCards = async () => {
      try {
        dispatch(setProgress(50));
        const res = await fetch(`${baseUrl}job/fetchSmallCards`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          setJobs(data.jobs);
          setCompanies(data.companies);
        } else {
          setError(data.error);
        }

        dispatch(setProgress(100));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSmallCards();
  }, []);

  return (
    <div className="flex flex-col h-fit max-lg:hidden max-xl:pr-4 max-xl:border-none px-8 py-8 justify-between gap-8 border-l fixed right-0 top-16 ">
      <>
        <div className="suggested-jobs flex flex-col items-start min-h-1/2">
          <p className="text-xl mb-4 flex items-center gap-2">
            Suggested Jobs <PiSuitcaseSimpleThin />
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="jobcard-small">
            <Suspense
              fallback={
                <div className="w-full h-1/2 flex items-center justify-center">
                  <PacmanLoader />
                </div>
              }
            >
              {jobs.map((job, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 border-b border-gray-200 hover-effect relative before:h-[1px] ${
                      theme === "dark" && "hover-effect-dark"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/companies/${job.company.name}`}
                        className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden hover:shadow-[0_0_25px_gray]"
                      >
                        <img
                          src={job.company.logo.url}
                          alt="logo"
                          className="w-12 h-12 object-contain flex items-center justify-center"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          to={`/dashboard/jobs/${job._id}`}
                          className="text-sm font-semibold"
                        >
                          {job.title}
                        </Link>
                        <Link
                          to={`dashboard/companies/${job.company.name}`}
                          className="text-xs font-semibold"
                        >
                          {job.company.name}
                        </Link>
                        <p className="text-xs">{job.salary}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end w-1/3 overflow-hidden">
                      <p className="text-xs ">{job.location ? job.location : job.company.location}</p>
                    </div>
                  </div>
                );
              })}
            </Suspense>
          </div>
        </div>

        <div className="suggested-companies flex flex-col items-start mb-4">
          <p className="text-xl flex items-center gap-2">
            Trending Companies <HiTrendingUp />
          </p>
          <div className="company-card w-full">
            {companies.map((company, idx) => {
              return (
                <Link
                  to={`/dashboard/companies/${company.name}`}
                  key={idx}
                  className={`flex items-center gap-4 w-full justify-start p-2 border-b border-gray-200 hover-effect relative  before:h-[1px] ${
                    theme === "dark" && "hover-effect-dark"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden hover:shadow-[0_0_25px_gray]">
                    <img
                      src={company.logo.url}
                      alt="logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>{company.name}</p>
                    <p className="text-xs font-light">
                      <CountUp end={500} duration={3} suffix="+" /> employees
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    </div>
  );
};

export default RightSidebar;
