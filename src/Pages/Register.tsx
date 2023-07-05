import { registerValidation } from "Components/Validation/UserValidation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "Components/UserInput";
import { InlineError } from "Components/Notifications/Error";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { registerAction } from "Redux/Actions/userActions";
import toast from "react-hot-toast";
import { UserRegister } from "interfaces/User";
// import "../App.css"

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState("Ошибка");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { isLoading } = useSelector((state: RootState) => state.userLogin);

  const userInfo = useAppSelector((state: UserRegister) => state?.userRegister);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerValidation) });

  const onSubmit = (data: any) => {
    dispatch(registerAction(data));
  };
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo && isError === "i") {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcom  ${userInfo?.fullName}`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, []);
  return (
    <div className="container mx-auto px-2 my-24 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-2/5 gap-8 flex-col p-8 sm:p-14"
      >
        <img className="w-full h-12 object-contain" />
        <div className="w-full">
          <Input
            label="FullName"
            placeholder="fullName"
            type="fullName"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && (
            // <p className="text-red-500 text-sm">{errors.email.message}</p>
            <InlineError text={errors.fullName.message} />
          )}
        </div>

        <div className="w-full">
          <Input
            label="Email"
            placeholder="netflix0@gmail.com"
            type="email"
            name="email"
            // value={email}
            // onChange={setEmail}
            register={register("email")}
            bg={true}
          />
          {errors.email && (
            // <p className="text-red-500 text-sm">{errors.email.message}</p>
            <InlineError text={errors.email.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Password"
            placeholder="******"
            type="password"
            name="password"
            register={register("password")}
          />
          {errors.password && (
            // <p className="text-red-500 text-sm">{errors.email.message}</p>
            <InlineError text={errors.password.message} />
          )}
        </div>
        <button
          type="submit"
          // disabled={isLoading}
          className="bg-subMain transitions hover:bg-main flex-row gap-4 "
        >
          {/* <FiLogIn />  */}
          {isLoading ? (
            "Loading"
          ) : (
            <>
              {/* <FiLogIn />  */}
              Sign Up
            </>
          )}
        </button>
        <p className="text-center text-borrder">
          Don't have account?{""}
          <Link to={"/register"} className="text-dryGray font-semibold ml-2">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
