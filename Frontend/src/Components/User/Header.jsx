import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutDetails } from "../../Store/Slices/UserSlice";

function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Collect user data from redux store
  const userData = useSelector((state) => state.user);

  const logoutHandle = () => {
    localStorage.removeItem("token");
    dispatch(logoutDetails());
  };

  return (
    <Navbar className="mx-auto max-w-screen-2xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="h3"
          color="blue-gray"
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Wanderlust.
        </Typography>

        <div className="flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block">
            {userData.userName ? (
              <span onClick={() => navigate("/profile")}>
                <i className="fa-solid fa-user" />
                &nbsp;&nbsp; {userData.userName}{" "}
              </span>
            ) : (
              <span onClick={() => navigate("/login")}> Log In</span>
            )}
          </Button>

          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            {userData.id ? (
              <span onClick={logoutHandle}>Log Out</span>
            ) : (
              <span onClick={() => navigate("/signup")}> SignUp</span>
            )}
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              {userData.userName ? (
                <span onClick={() => navigate("/profile")}>
                  <i className="fa-solid fa-user" />
                  &nbsp;&nbsp; {userData.userName}{" "}
                </span>
              ) : (
                <span onClick={() => navigate("/login")}> Log In</span>
              )}
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              {userData.id ? (
                <span onClick={logoutHandle}>Log Out</span>
              ) : (
                <span onClick={() => navigate("/signup")}> SignUp</span>
              )}
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default Header;
