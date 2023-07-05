import { loginValidation } from "Components/Validation/UserValidation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "Components/UserInput";
import { InlineError } from "Components/Notifications/Error";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { loginAction } from "Redux/Actions/userActions";
import toast from "react-hot-toast";
import { UserLogin } from "interfaces/User";
// import "../App.css"

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [isLoading, setLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isError, setIsError] = useState("Ошибка");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, isSuccess, userInfo } = useSelector(
    (state: any) => state.userLogin
  );

  // const userInfo = useAppSelector((state: UserLogin) => state?.userLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidation) });

  const onSubmit = (data: any) => {
    dispatch(loginAction(data));
  };
  useEffect(() => {
    console.log();
    if (userInfo?.isAdmin) {
      // navigate("/dashboard");
    } else if (userInfo && isError === "i") {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcom back ${userInfo?.fullName}`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
  }, [dispatch, isError, isSuccess, navigate, userInfo]);

  return (
    <div className="container mx-auto px-2 my-24 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-2/5 gap-8 flex-col p-8 sm:p-14"
      >
        <img className="w-full h-12 object-contain" />
        <div className="w-full">
          <Input
            label="Email"
            placeholder="netflix0@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Password"
            placeholder="******"
            // value={password}
            // onChange={setPassword}
            type="password"
            name="password"
            register={register("password")}
            bg={true}
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
              Sign in
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

export default Login;
