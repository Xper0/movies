import React from "react";
import SideBar from "./SideBar";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { useSelector } from "react-redux";
import { UserLogin } from "interfaces/User";
import { useForm } from "react-hook-form";
import { PasswordValidation } from "Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "Components/UserInput";
import { useEffect, useState } from "react";
import { InlineError } from "Components/Notifications/Error";
import { changePasswordAction } from "Redux/Actions/userActions";
import toast from "react-hot-toast";

const Password = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, message, isSuccses } = useSelector(
    (state: any) => state.userChangePassword
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(PasswordValidation) });

  const onSubmit = (data: any) => {
    dispatch(changePasswordAction(data));
  };

  useEffect(() => {
    if (isSuccses) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({
        type: "USER_CHANGE_PASSWORD_RESET",
      });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [setValue, isSuccses, isError, dispatch, reset, message]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold"> Change Password</h2>
        <div className="w-full">
          <Input
            label="Old Password"
            placeholder="********"
            type="password"
            name="oldPassword"
            register={register("oldPassword")}
            bg={true}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full ">
          <Input
            label="New Password"
            placeholder="********"
            type="password"
            name="newPassword"
            register={register("newPassword")}
            bg={true}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            label="Confirm Password"
            placeholder="********"
            type="password"
            name="confirmPassword"
            register={register("confirmPassword")}
            bg={true}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            disabled={isLoading}
            className="bg-black font-medium transition hover:bg-red-500"
            type="submit"
          >
            {isLoading ? "Changing..." : "Change password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Password;
