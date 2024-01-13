import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { LoadUserList } from "../../Api/AdminApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DeleteUser } from "../../Api/AdminApi";

const TABLE_HEAD = ["No.", "User Name", "Email", "Mobile", "Edit", "Delete",];

function UserList() {
  const [userList, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  //===User list fetching from DB======================

  useEffect(() => {
    LoadUserList()
      .then((res) => {
        const userList = res.data.userData;
        setUser(userList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //===Data fetching by search==========================

  const userData = userList.filter((user)=> {
    const searchLower = search.toLowerCase();
    const emailMatch = user.email.toLowerCase().includes(searchLower);
    const nameMatch = user.userName.toLowerCase().includes(searchLower);
    const mobileMatch = user.mobile.toString().includes(searchLower);
    return emailMatch || nameMatch || mobileMatch
  })

  //===Delete user=======================================
   const deleteUser = async(userId) => {
    DeleteUser(userId).then((res)=> {
      setUser(userList.filter((user=> user._id !== userId)));
      toast.success("User Deleted !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }).catch((err)=>{
      console.log(err.message);
    })
   }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-2 lg:px-8 lg:py-4">
      <ToastContainer/>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users List
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search User"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-5 w-5" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={
                            user.image
                              ? `/images/${user.image}`
                              : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                          }
                          alt="Image"
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {user.userName}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.email}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.mobile}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Delete User">
                        <IconButton variant="text" onClick={()=> deleteUser(user._id)}>
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter> */}
      </Card>
    </div>
  );
}

export default UserList;
