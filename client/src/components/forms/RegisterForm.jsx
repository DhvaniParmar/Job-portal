import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { setProgress } from "@/redux/progress/progressSlice";
import { baseUrl } from "@/utils";

const formSchema = z
  .object({
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .refine(
        (value) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/.test(
            value
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
        }
      ),
    name: z.string().min(3, {
      message: "Name must be at least 3 characters long.",
    }),
    niches: z.array(z.string()).optional(),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must exactly be 10 characters long.",
      })
      .max(10, {
        message: "Phone number must exactly be 10 characters long.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [role, setRole] = React.useState("Applicant");
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Employer") {
      document.querySelector(".roles").classList.add("flip");
    }
  }, []);

  //To update the profile photo in form.
  const handleImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        // fieldChange(imageDataUrl);
        setProfilePhoto(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      niches: [],
      confirmPassword: "",
      phone: "",
    },
  });

  const handleRegister = async (values) => {
    try {
      dispatch(setProgress(30));
      const formData = new FormData();

      // Append JSON data as a blob
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);
      formData.append("niches", values.niches);
      formData.append("phone", values.phone);
      formData.append("role", role);
  
      // Append the file
      const resume = document.getElementById("resume").files[0];
        if (resume && role === "Applicant") {
          formData.append("resume", resume);
        }
        const profilePhoto = document.getElementById("profilePhoto").files[0];
        if (profilePhoto) {
          formData.append("profilePhoto", profilePhoto);
        }  

      const res = await fetch(`${baseUrl}user/register`, {
        body: formData,
        method: "POST",
      });
      dispatch(setProgress(60));
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        dispatch(setProgress(100));
        navigate("/dashboard");
      } else {
        dispatch(setProgress(100));
        setError(data.message);
      }
    } catch (error) {
      console.log("Error in handleLogin", error);
    }
  };

  const switchRoles = (e, role) => {
    e.preventDefault();
    setRole(role);
    document.querySelector(".roles").classList.toggle("flip");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    const passInput = document.getElementById("password");
    passInput.type = passInput.type === "password" ? "text" : "password";
  };

  return (
    <motion.div
      initial={{ y: "20px", opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "linear", duration: 0.5 }}
      className={`rounded-lg flex flex-col items-left md:px-12 px-6 py-4 shadow-[0_0_20px_gray] max-sm:mx-8 transition-all duration-500 bg-gradient-to-b max-w-[40vw] max-lg:min-w-fit mx-8 ${
        role === "Employer" ? "from-slate-900/20" : "from-[#43cdef45]"
      } `}
    >
      <h1 className="text-2xl pt-4 font-bold">Welcome to Jobster</h1>
      <p className="font-light py-1">
        Enter your details and help us in connecting you to your dream job.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-8 my-4 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-2 relative">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      className={`block bg-inherit border-[1px] appearance-none rounded-md focus:outline-none p-2 ${
                        theme === "dark"
                          ? "focus:border-white/40"
                          : "focus:border-slate-900"
                      } peer`}
                      {...field}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute bg-inherit backdrop-blur-md text-sm font-light z-[10] top-2 left-2 -translate-y-5 scale-75 duration-300 transform px-2 peer-focus:top-2 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-5 start-1`}
                    >
                      Enter Your Email
                    </label>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-2 relative">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      className={`block bg-inherit border-[1px] appearance-none rounded-md focus:outline-none p-2 ${
                        theme === "dark"
                          ? "focus:border-white/40"
                          : "focus:border-slate-900"
                      } peer`}
                      {...field}
                    />
                    <label
                      htmlFor="name"
                      className={`absolute bg-inherit backdrop-blur-md text-sm font-light z-[10] top-2 left-2 -translate-y-5 scale-75 duration-300 transform px-2 peer-focus:top-2 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-5 start-1`}
                    >
                      Full Name
                    </label>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          <div className="passwords flex max-sm:flex-col gap-4 w-full justify-between">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2 relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder=" "
                        className={`block bg-transparent border-[1px] appearance-none rounded-md focus:outline-none p-2 focus:ring-0  ${
                          theme === "dark"
                            ? "focus:border-white/40"
                            : "focus:border-slate-900"
                        } peer `}
                        {...field}
                      />
                      <label
                        htmlFor="password"
                        className={`absolute bg-inherit backdrop-blur-md text-sm font-light z-[10] top-2 left-2 -translate-y-5 scale-75 duration-300 transform px-2 peer-focus:top-2 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-5 start-1`}
                      >
                        Enter Your Password
                      </label>
                      {
                        <div
                          className="toggle absolute right-2 translate-y-[70%] font-extralight"
                          onClick={() => togglePasswordVisibility()}
                        >
                          {passwordVisible ? <IoIosEye /> : <IoIosEyeOff />}{" "}
                        </div>
                      }
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium " />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2 relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder=" "
                        className={`block bg-transparent border-[1px] appearance-none rounded-md focus:outline-none p-2 focus:ring-0  ${
                          theme === "dark"
                            ? "focus:border-white/40"
                            : "focus:border-slate-900"
                        } peer `}
                        {...field}
                      />
                      <label
                        htmlFor="confirmPassword"
                        className={`absolute bg-inherit backdrop-blur-md text-sm font-light z-[10] top-2 left-2 -translate-y-5 scale-75 duration-300 transform px-2 peer-focus:top-2 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-5 start-1`}
                      >
                        Confirm Password
                      </label>
                      {
                        <div
                          className="toggle absolute right-2 translate-y-[70%] font-extralight"
                          onClick={() => togglePasswordVisibility()}
                        >
                          {passwordVisible ? <IoIosEye /> : <IoIosEyeOff />}{" "}
                        </div>
                      }
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium " />
                </FormItem>
              )}
            />
          </div>

          <div className="flex max-sm:flex-col gap-4 md:gap-8 w-full justify-between ">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2 relative flex-1">
                      <input
                        type="number"
                        id="phone"
                        placeholder=" "
                        className={`block bg-inherit border-[1px] appearance-none rounded-md focus:outline-none p-2 ${
                          theme === "dark"
                            ? "focus:border-white/40"
                            : "focus:border-slate-900"
                        } peer`}
                        {...field}
                      />
                      <label
                        htmlFor="phone"
                        className={`absolute bg-inherit backdrop-blur-md text-sm font-light z-[10] top-2 left-2 -translate-y-5 scale-75 duration-300 transform px-2 peer-focus:top-2 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-5 start-1`}
                      >
                        Mobile Number
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />
            {role === 'Applicant' && <div className="resume flex flex-col max-sm:w-full">
              <label htmlFor="resume" className="text-xs">
                Upload Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="resume"
                className="text-sm file:bg-transparent file:rounded-md"
              />
            </div>}
          </div>

          <div className="flex w-full items-center justify-start">
            <div className="label flex h-16 w-auto aspect-square items-center justify-center bg-[#000] rounded-full border-2 overflow-hidden shadow-[0_0_20px_gray] mx-2 !important">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="profile_icon"
                  width={96}
                  height={96}
                  className="rounded-full object-cover h-full aspect-square"
                />
              ) : (
                <img
                  src="https://github.com/shadcn.png"
                  alt="profile_icon"
                  width={24}
                  height={24}
                  className="object-cover rounded-full h-full w-full aspect-square"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              placeholder="Add profile photo"
              id="profilePhoto"
              className="cursor-pointer text-white bg-transparent outline-none file:bg-transparent file:rounded-md !important"
              onChange={(e) => handleImage(e)}
            />
          </div>

          <div className="flex justify-start w-full items-center gap-4 max-sm:gap-2 px-2">
            <p className="font-light max-sm:text-xs">Select Role :</p>
            <div
              className="roles font-light flex items-center justify-center w-fit transition-all duration-500 ease-in relative transform rounded-md border"
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                className={`role flex items-center px-8 text-sm py-1 z-[2] relative overflow-hidden  border border-gray-700 rounded-md`}
                onClick={(e) => switchRoles(e, "Employer")}
                style={{ backfaceVisibility: "hidden" }}
              >
                Applicant
              </button>
              <button
                className={`role absolute top-0 left1/2 flex items-center justify-center px-8 text-sm py-1 z-[-1] overflow-hidden border border-gray-700 rounded-md`}
                onClick={(e) => switchRoles(e, "Applicant")}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                Employer
              </button>
            </div>
          </div>

          {role === "Applicant" && <div className="applicant-only flex flex-col">
            Niches
            </div>}

          {error && (
            <p className="text-xs text-red-600 italic w-full pl-4">{error}</p>
          )}

          <button type="submit" className="auth-button w-full">
            Register
          </button>
        </form>
      </Form>
    </motion.div>
  );
};

export default RegisterForm;
