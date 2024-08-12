import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginForm = () => {
  const theme = useSelector((state) => state.theme.value);
  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: "applicant",
  });

  useEffect(() => {
    if (state.role === "employer") {
      document.querySelector(".roles").classList.add("flip");
    }
  }, []);

  const switchRoles = (e, role) => {
    e.preventDefault();
    setState({ ...state, role });
    document.querySelector(".roles").classList.toggle("flip");
  };

  const handleLogin = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ y: "20px", opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "linear", duration: 0.5 }}
      className={`rounded-lg flex flex-col items-left px-12 py-4 shadow-[0_0_20px_gray] max-sm:mx-8 transition-all duration-500 bg-gradient-to-b ${
        state.role === "employer" ? "from-slate-900/20" : "from-[#43cdef45]"
      } `}
    >
      <h1 className="text-2xl pt-4 font-bold">Welcome to Jobster</h1>
      <p className="font-light py-1">
        Enter your details and help us connecting you to your dream job.
      </p>

      <div className="flex flex-col gap-0 mt-4 items-center">
        <form className="flex flex-col gap-8 py-8 px-2 w-full">
          <div className="flex flex-col gap-2 relative">
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder=" "
              className={`block bg-inherit border-[1px] appearance-none rounded-md focus:outline-none p-2 ${
                theme === "dark"
                  ? "focus:border-white/40"
                  : "focus:border-slate-900"
              } peer`}
            />
            <label
              htmlFor="email"
              className={`absolute bg-inherit backdrop-blur-md text-sm font-light z-[10] top-2 left-2 -translate-y-5 scale-75 duration-300 transform px-2 peer-focus:top-2 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-5 start-1`}
            >
              Enter Your Email
            </label>
          </div>

          <div className="flex flex-col relative">
            <input
              type="password"
              id="password"
              className={`block bg-transparent border-[1px] appearance-none rounded-md focus:outline-none p-2 ${
                theme === "dark"
                  ? "focus:border-white/40"
                  : "focus:border-slate-900"
              } peer`}
              placeholder=" "
            />
            <label
              htmlFor="password"
              className={`absolute bg-inherit backdrop-blur-sm text-sm font-light top-2 left-2 px-2 duration-300 transform -translate-y-5 scale-75 z-[10] peer-focus:top-2 peer-focus:left-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2`}
            >
              Enter Your Password
            </label>
          </div>

          <div className="flex justify-start w-full items-center gap-4 max-sm:gap-2 px-2">
            <p className="font-light max-sm:text-xs">Select Role :</p>
            <div
              className="roles flex items-center justify-center w-fit transition-all duration-500 ease-in relative transform rounded-md border"
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                className={`role flex items-center px-8 text-sm py-1 z-[2] relative overflow-hidden `}
                onClick={(e) => switchRoles(e, "employer")}
                style={{ backfaceVisibility: "hidden" }}
              >
                Applicant
              </button>
              <button
                className={`role absolute top-0 left1/2 flex items-center justify-center px-8 text-sm py-1 z-[-1] overflow-hidden`}
                onClick={(e) => switchRoles(e, "applicant")}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                Employer
              </button>
            </div>
          </div>

          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
