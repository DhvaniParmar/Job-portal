import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";

const UserAvatar = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <Popover sideOffset={5}>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className={`z-[99] ${theme === "dark" ? "bg-zinc-900 text-white" : "bg-inherit backdrop-blur-lg"} hover:shadow-[0_0_20px_gray] shadow-gray-700 flex flex-col justify-between`}>
        <Link to={`/users/userId`} className='w-full py-2 flex items-center justify-center hover:text-slate-600'>View Profile</Link>
        <Link to={`/logout`} className='w-full py-2 flex items-center justify-center gap-4 border-t hover:text-slate-600'>
            <HiLogout />
            <span>Logout</span>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
