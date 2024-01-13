import axios from "axios";

const AdminApi = axios.create({
    baseURL: "http://localhost:8000/admin"
})

export async function AdminLogin(LoginData) {
    try {
        const AdminLogin = await AdminApi.post('/login',LoginData);
        return AdminLogin
    } catch (error) {
        console.log(error.message);
    }
}