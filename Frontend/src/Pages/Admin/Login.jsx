import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { AdminLogin } from "../../Api/AdminApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Store/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || emailError) {
        setEmailError("Must fillout the field");
      } else if (password.trim() === "" || passError) {
        setPassError("Must fillout the field.");
      } else {
        const loginResponse = await AdminLogin({ email, password });
        if (loginResponse.data.status) {
          localStorage.setItem("adminToken", loginResponse.data.token);
          dispatch(
            setUserDetails({
              id: loginResponse.data.adminData._id,
              userName: loginResponse.data.adminData.userName,
              mobile: loginResponse.data.adminData.mobile,
              email: loginResponse.data.adminData.email,
              is_Admin: loginResponse.data.adminData.is_Admin,
              image: loginResponse.data.adminData.image,
            })
          );
          toast.success("Successfully logged !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 3000);
        } else {
          if (loginResponse.data.err === "email") {
            setEmailError(loginResponse.data.alert);
          } else {
            setPassError(loginResponse.data.alert);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <ToastContainer />
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Admin Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you!.
        </Typography>
        <form
          onSubmit={adminLogin}
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
                  setEmailError("Enter valid Email Address.");
                } else {
                  setEmailError("");
                }
              }}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {emailError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{emailError}
              </p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 6) {
                  setPassError("Enter valid password");
                } else {
                  setPassError("");
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
            {passError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{passError}
              </p>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            LogIn
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
