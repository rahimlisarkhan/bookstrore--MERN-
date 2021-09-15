import { AxiosResponse } from "axios"
import { AdminChangePasswordType, AdminLoginType } from "../interfaces/admin.model"
import { Axios } from "../utils/axios-util"


//Admin Auth login
export const AdminLoginRequest = async (data: AdminLoginType) => {
    const response = await Axios.post<any, AxiosResponse>('admin/login', data)
    return response
}

//Admin Change Password
export const AdminChangePasswordRequest = async (data: AdminChangePasswordType) => {
    const response = await Axios.post<any, AxiosResponse>('admin/password-change', data)
    return response
}

//Users Get
export const getAdminUsersRequest = async () => {
    const response = await Axios.get<any, AxiosResponse>('users/users-list')
    return response
}

//Product Get
export const getAdminProductsRequest = async () => {
    const response = await Axios.get<any, AxiosResponse>('books')
    return response
}

//Admin Orders Get
export const getAdminOrdersRequest = async () => {
    const response = await Axios.get<any, AxiosResponse>('orders')
    return response
}

//Admin Order Remove 
export const removeAdminOrdersRequest = async (order_id: string | number) => {
    const response = await Axios.delete<any, AxiosResponse>(`orders/${order_id}`)
    return response
}