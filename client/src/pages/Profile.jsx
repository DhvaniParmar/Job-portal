import { setProgress } from "@/redux/progress/progressSlice";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import React, { Suspense, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || null;
  if (!token) navigate("/auth?redirect=true");
  const [user, setUser] = React.useState(jwtDecode(token));

  useEffect(() => {
    dispatch(setProgress(30));
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:4000/api/v1/user/getuser`, {
        body: JSON.stringify({ userId: user.id }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setProgress(100));
      if (data && data.success) {
        setUser(data.user);
      } else {
        console.log(data);
      }
    };
    fetchUser();
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
            {user.image ? (
              <img
                src={user?.image}
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
                <p className="font-bold text-xl">{user.name}</p>
                <p>Id : {user._id}</p>
              </div>
              {user._id === jwtDecode(localStorage.getItem("token")).id && (
                <button className="auth-button mx-12 flex items-center gap-2">
                  Edit <FaEdit />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Suspense>
  );
};

export default Profile;
