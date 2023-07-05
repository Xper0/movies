import { logoutAction } from "Redux/Actions/userActions";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { UserLogin } from "interfaces/User";
import React from "react";
import { toast } from "react-hot-toast";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import {
  RiLockPasswordLine,
  RiLogoutCircleLine,
  RiMovieFill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "Components/Layout/NavBar";

interface SideBar {
  children: React.ReactNode;
}
const SideBar = ({ children }: SideBar) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state: any) => state?.userLogin);
  console.log(userInfo?.userInfo);
  const logoutHandler = () => {
    dispatch(logoutAction);
    navigate("/login");
    toast.success("Logged out succssfully");
  };
  const SideLinks = userInfo?.isAdmin
    ? [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          name: "Movies List",
          link: "/movieslist",
          icon: FaListAlt,
        },
        {
          name: "Add Movie",
          link: "/addmovie",
          icon: RiMovieFill,
        },
        {
          name: "Users",
          link: "/users",
          icon: FaUsers,
        },
        {
          name: "Categories",
          link: "/categories",
          icon: HiViewGridAdd,
        },
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Favorites Movies",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
    : userInfo
    ? [
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Favorites Movies",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
    : [];
  const active = "bg-dryGray tex-subMain";
  const hover = "hover.text-white hover.bgmain";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }: any) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
  return (
    <div>
      <NavBar />
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded">
            {SideLinks.map((link, index) => (
              <NavLink to={link.link} key={index} className={Hover}>
                <link.icon />
                <p>{link.name}</p>
              </NavLink>
            ))}
            <button
              onClick={logoutHandler}
              className={`${inActive} ${hover} w-full`}
            >
              <RiLogoutCircleLine /> Log Out
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duratation="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
