import { setProgress } from "@/redux/progress/progressSlice";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import React, { Suspense, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || null;
  if (!token) navigate("/auth?redirect=true");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setProgress(300));
  }, []);

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center"><PacmanLoader/></div>
      }
    >
      <motion.div
        initial={{ y: "20px" }}
        animate={{ y: 0 }}
        exit={{ y: "20px" }}
        transition={{ ease: "linear", duration: 0.3 }}
        className="w-full pt-6 flex flex-col max-lg:px-4"
      >
        <div className="header">
          <img
            src="/images/header.png"
            alt="header"
            className="w-full aspect-[16/5] object-cover"
          />
          <div className="details flex items-end gap-4 h-fit ">
            {user.profilePhoto ? (
              <img
                src={user?.profilePhoto.url}
                alt={user?.name}
                className="w-[20%] aspect-square rounded-full overflow-hidden border-2 z-[22] -mt-[10%] h-[120%] shadow-[0_0_20px_gray]"
              />
            ) : (
              <img
                src="https://github.com/shadcn.png"
                alt={user?.name}
                className="w-[20%] aspect-square rounded-full overflow-hidden border-2 z-[22] -mt-[10%] h-[120%] shadow-[0_0_20px_gray]"
              />
            )}
            <div className="flex justify-between items-center flex-1">
              <div className="creds flex flex-col justify-end items- h-full">
                <p className="font-bold text-xl capitalize">{user.name}</p>
                <p>Id : {user.id}</p>
              </div>
              {user.id === jwtDecode(localStorage.getItem("token")).id && (
                <Link to='/dashboard/profile/edit' className="auth-button mx-12 flex items-center gap-2">
                  Edit <FaEdit />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
};

export default Profile;
