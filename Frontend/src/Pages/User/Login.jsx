import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userLogIn } from "../../Api/UserApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Slices/UserSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");

  const loginHandle = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || emailAlert) {
      setEmailAlert("Must fillout the field.");
    } else if (password.trim() === "" || passAlert) {
      setPassAlert("Must fillout the field.");
    } else {
      const loginResponse = await userLogIn({ email, password });
      if (loginResponse.data.status) {
        localStorage.setItem("token", loginResponse.data.token);
        dispatch(
          setUserDetails({
            id: loginResponse.data.userLoginData._id,
            userName: loginResponse.data.userLoginData.userName,
            email: loginResponse.data.userLoginData.email,
            image: loginResponse.data.userLoginData.image,
            mobile: loginResponse.data.userLoginData.mobile,
            is_Admin: loginResponse.data.userLoginData.is_Admin,
          })
        );
        toast.success("Successfully logged !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        if (loginResponse.data.err === "email") {
          setEmailAlert(loginResponse.data.alert);
        } else {
          setPassAlert(loginResponse.data.alert);
        }
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <ToastContainer />
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your email and password to login.
        </Typography>
        <form
          onSubmit={loginHandle}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                  setEmailAlert("Please enter a valid email address.");
                } else {
                  setEmailAlert("");
                }
              }}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {emailAlert && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{emailAlert}
              </p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              value={password}
              onChange={(e) => {
                setPass(e.target.value);

                if (e.target.value.length < 6) {
                  setPassAlert("Please enter the valid password.");
                } else {
                  setPassAlert("");
                }
              }}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {passAlert && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{passAlert}
              </p>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="font-medium text-gray-900"
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Login;
