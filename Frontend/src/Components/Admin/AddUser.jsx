import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { addNewUser } from "../../Api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    nameError: "",
    emailError: "",
    mobError: "",
    passError: "",
  });
  const navigate = useNavigate();

  //===Add new user data to DB.
  const AddUserHandle = async (e) => {
    e.preventDefault();
    try {
      //validation
      if (value.name.trim() === "" || alert.nameError) {
        setAlert({ ...alert, nameError: "Must fillout the field." });
      } else if (value.email.trim() === "" || alert.emailError) {
        setAlert({ ...alert, emailError: "Must fillout the field." });
      } else if (value.mobile === "" || alert.mobError) {
        setAlert({ ...alert, mobError: "Must fillout the field." });
      } else if (value.password.trim() === "" || alert.passError) {
        setAlert({ ...alert, passError: "Must fillout the field." });
      } else {
        //==User data passing through api.
        addNewUser(value)
          .then((res) => {
            if (res.data.err) {
              setAlert({ ...alert, emailError: res.data.message });
            } else {
              toast.success(res.data.message, {
                position: "top-left",
              });
              setTimeout(() => {
                navigate("/admin/dashboard");
              }, 3000);
            }
          })
          .catch((error) => console.log(error.message));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-2 lg:px-8 lg:py-4 flex justify-evenly">
      <ToastContainer />
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Create User
        </Typography>
        <form
          onSubmit={AddUserHandle}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Name
            </Typography>
            <Input
              value={value.name}
              onChange={(e) => {
                setValue({ ...value, name: e.target.value });
                if (e.target.value.length < 4) {
                  setAlert({
                    ...alert,
                    nameError: "User name must be 4 letters or more.",
                  });
                } else {
                  setAlert({ ...alert, nameError: "" });
                }
              }}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {alert.nameError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{alert.nameError}
              </p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Email
            </Typography>
            <Input
              value={value.email}
              onChange={(e) => {
                setValue({ ...value, email: e.target.value });
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                  setAlert({
                    ...alert,
                    emailError: "Enter valid email address.",
                  });
                } else {
                  setAlert({ ...alert, emailError: "" });
                }
              }}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {alert.emailError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{alert.emailError}
              </p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Number
            </Typography>
            <Input
              value={value.mobile}
              onChange={(e) => {
                setValue({ ...value, mobile: e.target.value });
                if (
                  e.target.value.length !== 10 ||
                  e.target.value === "0000000000"
                ) {
                  setAlert({
                    ...alert,
                    mobError: "Enter valid mobile number.",
                  });
                } else {
                  setAlert({ ...alert, mobError: "" });
                }
              }}
              size="lg"
              type="number"
              placeholder="*******675"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {alert.mobError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{alert.mobError}
              </p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              value={value.password}
              onChange={(e) => {
                setValue({ ...value, password: e.target.value });
                if (e.target.value.length < 6) {
                  setAlert({
                    ...alert,
                    passError: "Password must be 6 letters or above.",
                  });
                } else {
                  setAlert({ ...alert, passError: "" });
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
            {alert.passError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{alert.passError}
              </p>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Create User
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
