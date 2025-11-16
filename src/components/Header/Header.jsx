import React from "react";
import { Container } from "../../Index/index";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import { NavLink } from "react-router-dom";
import auth from "../../../appwrite/auth";

function Header() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Signin",
      slug: "/signin",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "AllPost",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "AddPost",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Contact-us",
      slug: "/contact-us",
      active: !authStatus,
    },
  ];

  return (
    <header className=" py-3 bg-amber-50 shadow-xl mb-7">
      <Container>
        <div className="flex flex-row">
          <div className="w-2/3">
            <span className="text-2xl uppercase font-medium font-serif tracking-widest">
              Nordic Rose
            </span>
          </div>
          <div className="w-2/5">
            <input type="checkbox" className="checkBox green"/>
            <div className="menuBurgur">
              <span className="burgur1"></span>
              <span className="burgur2"></span>
              <span className="burgur3"></span>
            </div>
            <ul id="menu" className="flex flex-row justify-between items-end h-full pb-0.5">
              {navItem.map(
                (item) =>
                  item.active && (
                    <li
                      id="item"
                      key={item.slug}
                      className="text-[16px] font-semibold text-gray-600 font-sans hover:cursor-pointer "
                    >
                      <NavLink to={item.slug} className={({ isActive }) => (isActive ? "!text-yellow-600 border-b-2 border-yellow-500" : "")}>
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li id="item" className="logoutBtn text-[16px] font-semibold text-gray-600 font-sans hover:cursor-pointer ">
                  <NavLink
                    onClick={async () => {
                      await auth.logout();
                      dispatch(logout());
                      window.location.href = "/";
                    }}
                  >
                    <span>Logout</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
