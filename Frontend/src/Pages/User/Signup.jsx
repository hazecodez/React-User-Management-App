import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nameAlert, setNameAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [numberAlert, setNumAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");

  //Validation and data save to store (Signup handling)
  const signupHandle = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "" || nameAlert) {
        setNameAlert("Must fillout the field.");
      } else if (email.trim() === "" || emailAlert) {
        setEmailAlert("Must fillout the field.");
      } else if (number.trim() === "" || numberAlert) {
        setNumAlert("Must fillout the field.");
      } else if (password.trim() === "" || passAlert) {
        setPassAlert("Must fillout the field.");
      } else {
        console.log("settt");
      }
    } catch (error) {}
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={signupHandle}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.length < 4 || e.target.value.trim() === "") {
                  setNameAlert("Username must be 4 letters.");
                } else {
                  setNameAlert("");
                }
              }}
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {nameAlert && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{nameAlert}
              </p>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                  setEmailAlert("Please enter a valid email address.");
                } else {
                  setEmailAlert("");
                }
              }}
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
              Your Number
            </Typography>
            <Input
              type="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                if (
                  e.target.value.length !== 10 ||
                  e.target.value === "0000000000"
                ) {
                  setNumAlert("Please enter a valid mobile number.");
                } else {
                  setNumAlert("");
                }
              }}
              size="lg"
              placeholder="******6543"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {numberAlert && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{numberAlert}
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
                  setPassAlert("Password must be 6 characters or longer.");
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

          <Button className="mt-6" fullWidth type="submit">
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="font-medium text-gray-900"
            >
              Log In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
