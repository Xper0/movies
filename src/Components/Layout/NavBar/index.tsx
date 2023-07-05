import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "hook/redux";
// import logo from "../../../assets/img/logo.svg";
interface NavLinks {
  url: string;
  menuItem?: string | React.ReactNode;
}

const NavBar = () => {
  const { userInfo } = useAppSelector((state: any) => state?.userLogin);
  const hover = "hover:text-red-500 transitions text-white";
  const Hover = ({ isActive }: any) => (isActive ? "text-red-500" : hover);
  const navLinks: NavLinks[] = [
    {
      url: "movies",
      menuItem: "Movies",
    },
    {
      url: "about-us",
      menuItem: "About us",
    },
    {
      url: "contact-us",
      menuItem: "Contact-us",
    },
    {
      url: userInfo?.isAdmin ? "dashboard" : userInfo ? "profile" : "login",
      menuItem: <CgUser className="w-8 h-8" />,
    },
    {
      url: "favorites",
    },
  ];
  return (
    <div className="bg-main shadow-md sticky top-0 z-20">
      <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-around">
        <div className="col-span-1 lg:block hidden">
          <Link to={"/"}>
            <img
              src={"movi.svg"}
              alt="logo"
              className="w-full h-12 object-contain bg-main testclass"
            />
          </Link>
        </div>
        <div className="col-span-3 flex items-center  justify-center">
          <form className="w-full text-sm  rounded flex-btn flex items-center ">
            <button
              type="submit"
              className="bg-subMain w-12 h-12  flex-col rounded text-white justify-center bg-red-600 items-center"
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search Movie Name from here"
              className="font-medium placeholder:text-border text-sm w-11/12 h-12 p-3"
            />
          </form>
        </div>
        {/*menu*/}
        <div className="col-span-3 font-medium text-sm  xl:gap-14 2xl:gap-20 flex items-center">
          {navLinks.map((item, index: number) => (
            <>
              {item.url === "favorites" ? (
                <NavLink
                  to={`/${item.url}`}
                  className={`${Hover} relative`}
                  key={index}
                >
                  <FaHeart className="w-6 h-6 bg-white relative" />
                  <div className="w-5 h-5 flex-col rounded-full text-xs bg-subMain absolute -top-5 -right-2 text-white">
                    3
                  </div>
                </NavLink>
              ) : (
                <NavLink to={`/${item.url}`} className={Hover} key={index}>
                  {item.menuItem}
                </NavLink>
              )}
            </>
          ))}
          <img src={userInfo ? userInfo?.image : ""} alt="user" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
