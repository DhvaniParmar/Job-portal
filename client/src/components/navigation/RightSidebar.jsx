import { jobs } from "@/utils";
import React from "react";
import { Link } from "react-router-dom";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const theme = useSelector((state) => state.theme.value);

  return (
    <div className="flex flex-col h-fit max-lg:hidden max-xl:pr-4 max-xl:border-none px-8 py-8 justify-between gap-8 border-l fixed right-0 top-16 ">
      <div className="suggested-jobs flex flex-col items-start min-h-1/2">
        <p className="text-xl mb-4 flex items-center gap-2">
          Suggested Jobs <PiSuitcaseSimpleThin />
        </p>
        <div className="jobcard-small">
          {jobs.map((job, idx) => {
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 border-b border-gray-200 hover-effect relative before:h-[1px] ${theme === 'dark' && 'hover-effect-dark'}`}
              >
                <div className="flex items-center gap-2">
                  <Link
                    to={`/companies/${job.company}`}
                    className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden hover:shadow-[0_0_25px_gray]"
                  >
                    <img
                      src={job.logo}
                      priority
                      fetchPriority="high"
                      alt='logo'
                      className="w-12 h-12 object-contain flex items-center justify-center"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="text-sm font-semibold"
                    >
                      {job.title}
                    </Link>
                    <Link
                      to={`/companies/${job.company}`}
                      className="text-xs font-semibold"
                    >
                      {job.company}
                    </Link>
                    <p className="text-xs">{job.salary}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end w-1/3 overflow-hidden">
                  <p className="text-xs ">{job.location.split(",")[0]}</p>
                  <p className="text-xs ">{job.location.split(",")[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-start mb-4">
        <p className="text-xl flex items-center gap-2">
          Trending Companies <HiTrendingUp />
        </p>
        <div className="company-card w-full">
          {jobs.slice(0, 3).map((job, idx) => {
            return (
              <Link
                to={`/companies/${job.company}`}
                key={idx}
                className={`flex items-center gap-4 w-full justify-start p-2 border-b border-gray-200 hover-effect relative  before:h-[1px] ${theme === 'dark' && 'hover-effect-dark'}`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden hover:shadow-[0_0_25px_gray]">
                  <img
                    src={job.logo}
                    alt="logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p>{job.company}</p>
                  <p className="text-xs font-light"><CountUp end={500} duration={3} suffix='+'/> employees</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
