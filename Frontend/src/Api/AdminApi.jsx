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

export async function LoadUserList () {
    try {
        const listResponse = AdminApi.get('/loadUsers')
        return listResponse
    } catch (error) {
        console.log(error.message);
    }
}

export async function DeleteUser (userId) {
    try {
        const deleteResponse = AdminApi.post('/deleteUser', {userId})
        return deleteResponse;
    } catch (error) {
        console.log(error.message);
    }
}