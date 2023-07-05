import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Input from "Components/UserInput";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "interfaces/User";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "Components/Validation/UserValidation";
import { InlineError } from "Components/Notifications/Error";
import ImagePreview from "Components/Imagepreview";
import { useSelector } from "react-redux";
import {
  deleteProfileAction,
  updateProfileAction,
} from "Redux/Actions/userActions";
import Uploader from "Components/Uploader";
import { toast } from "react-hot-toast";
import * as userConstants from "../../../src/Redux/Constans/UserConstans";
const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userInfo = useAppSelector((state: UserLogin) => state?.userLogin);
  const { isLoading, isError, isSuccses } = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const {
    isLoading: delLoad,
    isError: delErr,
    isSuccses: delSuc,
  } = useSelector((state: any) => state.deleteProfileReducer);

  const [imgUrl, setImgUrl] = useState(userInfo?.image ?? "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ProfileValidation) });

  //update
  const onSubmit = (data: any) => {
    dispatch(updateProfileAction({ ...data, image: imgUrl }));
  };
  //delete prof
  const deleteProfile = () => {
    window.confirm("Are you sure you want delete your profile?? ") &&
      dispatch(deleteProfileAction());
  };

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccses) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || delErr) {
      toast.error(isError || delErr);
      dispatch({
        type: userConstants.USER_DELETE_PROFILE_RESET,
      });
    }
  }, [userInfo, setValue, isSuccses, isError, dispatch, delErr]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImgUrl} />
          </div>
          <div className="col-span-2">
            <ImagePreview
              name={userInfo?.fullName ? userInfo.fullName : "image"}
              image={imgUrl}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="FullName"
            placeholder="fullName"
            type="fullName"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
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
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between">
          <button
            disabled={delLoad || isLoading}
            className="bg-red-500 font-medium transition hover:bg-black"
            onClick={deleteProfile}
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button className="bg-black font-medium transition hover:bg-red-500">
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default Profile;
