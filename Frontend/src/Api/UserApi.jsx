import axios from "axios";

const UserApi = axios.create({
    baseURL: 'http://localhost:8000'
})

export async function userSignUp(signUpData) {
    try {
        const data = await UserApi.post('/signup',signUpData);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}