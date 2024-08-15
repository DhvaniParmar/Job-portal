import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { HiLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getInitials } from "@/utils/services";
import { setProgress } from "@/redux/progress/progressSlice";

const UserAvatar = () => {
  const theme = useSelector((state) => state.theme.value);
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = jwtDecode(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try{
      dispatch(setProgress(30));
      await fetch(`http://localhost:4000/api/v1/user/logout`,{
        method: "GET",
      })
      dispatch(setProgress(70));
      localStorage.removeItem("token");
      dispatch(setProgress(100));
      navigate('/')
    }catch(error){
      console.error(error.message)
    }
  }

  return (
    <Popover sideOffset={5}>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className={`z-[99] ${theme === "dark" ? "bg-zinc-900 text-white" : "bg-inherit backdrop-blur-lg"} hover:shadow-[0_0_20px_gray] shadow-gray-700 flex flex-col justify-between`}>
        <Link to={`/users/${user.id}`} className='w-full py-2 flex items-center justify-center hover:text-slate-600'>View Profile</Link>
        <div onClick={()=>handleLogout()} className='w-full py-2 flex items-center justify-center gap-4 border-t hover:text-slate-600'>
            <HiLogout />
            <span>Logout</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
