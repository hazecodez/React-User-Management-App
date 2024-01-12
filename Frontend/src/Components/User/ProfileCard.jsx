import React, { useState } from "react";
import { Card, Input, List, ListItem, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userImageUpload } from "../../Api/UserApi";
import { setUserDetails } from "../../Store/Slices/UserSlice";
import { ToastContainer, toast } from "react-toastify";

function ProfileCard() {
  const { id, userName, mobile, email, image } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [images, setImage] = useState(null);
  const [button, setButton] = useState(false);
  const dispatch = useDispatch();

  const imageUpdate = async (e) => {
    e.preventDefault();
    const imageResponse = await userImageUpload(id, images);
    if (imageResponse.data.updated) {
      dispatch(
        setUserDetails({
          id: imageResponse.data.data._id,
          userName: imageResponse.data.data.userName,
          email: imageResponse.data.data.email,
          image: imageResponse.data.data.image,
          mobile: imageResponse.data.data.mobile,
          is_Admin: imageResponse.data.data.is_Admin,
        })
      );
      toast("Profile picture updated !");
      setButton(false);
    }
  };
  return (
    <div className="flex justify-center items-center text-start pt-5">
      <ToastContainer />
      <div className="w-1/4">
        <img
          className="h-56 w-56 rounded-full object-cover object-center"
          src={
            image
              ? `/images/${image}`
              : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
          }
          alt="nature image"
        />
      </div>

      <Card className="w-1/4">
        <List>
          {id ? (
            <>
              <ListItem>User Name : &nbsp;&nbsp; {userName}</ListItem>
              <ListItem>Email :&nbsp;&nbsp;{email}</ListItem>
              <ListItem>Mobile No :&nbsp;&nbsp;{mobile}</ListItem>
            </>
          ) : (
            <>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => navigate("/signup")}
              >
                <span> Sign Up</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => navigate("/login")}
              >
                <span> Log In</span>
              </Button>
            </>
          )}
        </List>
        {id && (
          <>
            <Input
              type="file"
              label="Profile Picture"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setButton(true);
              }}
            />
            {button && <Button onClick={imageUpdate}>Update Picture</Button>}
          </>
        )}
      </Card>
    </div>
  );
}

export default ProfileCard;
