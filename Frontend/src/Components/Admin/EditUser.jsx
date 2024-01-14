import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { loadEditUser, updateUserData } from "../../Api/AdminApi";
import { ToastContainer, toast } from "react-toastify";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    number: "",
  });
  const [alert, setAlert] = useState({
    nameError: "",
    emailError: "",
    numError: "",
  });

  //==Load edit user data======
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await loadEditUser(id);
        setValue({
          name: response.data.userData.userName,
          email: response.data.userData.email,
          number: response.data.userData.mobile,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    userData();
  }, [id]);

  //===Update user data=========
  const updateHandle = async (e) => {
    e.preventDefault();
    try {
      if (value.name.trim() === "" || alert.nameError) {
        setAlert({ ...alert, nameError: "Must fillout the field." });
      } else if (value.email.trim() === "" || alert.emailError) {
        setAlert({ ...alert, emailError: "Must fillout the field." });
      } else if (value.number === "" || alert.numError) {
        setAlert({ ...alert, numError: "Must fillout the field." });
      } else {
        updateUserData(value, id)
          .then((res) => {
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 3000);
          })
          .catch((error) => {
            console.log(error.message);
          });
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
          Update User
        </Typography>
        <form
          onSubmit={updateHandle}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Name
            </Typography>
            <Input
              name="name"
              value={value.name}
              onChange={(e) => {
                setValue({ ...value, [e.target.name]: e.target.value });
                if (e.target.value.length < 4) {
                  setAlert({
                    ...alert,
                    nameError: "Username must be 4 letters or above.",
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
              name="email"
              value={value.email}
              onChange={(e) => {
                setValue({ ...value, [e.target.name]: e.target.value });
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                  setAlert({
                    ...alert,
                    emailError: "Enter valid email address",
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
              name="number"
              value={value.number}
              onChange={(e) => {
                setValue({ ...value, [e.target.name]: e.target.value });
                if (
                  e.target.value.length !== 10 ||
                  e.target.value === "0000000000"
                ) {
                  setAlert({
                    ...alert,
                    numError: "Please enter a valid mobile number.",
                  });
                } else {
                  setAlert({ ...alert, numError: "" });
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
            {alert.numError && (
              <p style={{ color: "red" }}>
                <i className="fa-solid fa-triangle-exclamation" />
                &nbsp;&nbsp;&nbsp;{alert.numError}
              </p>
            )}
            {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Update User
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditUser;
