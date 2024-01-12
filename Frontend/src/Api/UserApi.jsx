import axios from "axios";

const UserApi = axios.create({
  baseURL: "http://localhost:8000",
});

export async function userSignUp(signUpData) {
  try {
    const data = await UserApi.post("/signup", signUpData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function userLogIn(logInData) {
  try {
    const data = await UserApi.post("/login", logInData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function userImageUpload(id, images) {
  try {
    const data = new FormData();
    data.append("image", images);
    data.append("userId", id);

    const config = {
      header: {
        "content-type": "multipart/form-data",
        userId: id,
      },
      withCredentials: true,
    };
    const imageData = await UserApi.post("/imageUpload", data, config);
    return imageData;
  } catch (error) {
    console.log(error.message);
  }
}
