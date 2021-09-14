import { AxiosResponse } from "axios"
import { AdminLoginType } from "../interfaces/admin.model"
import { Axios } from "../utils/axios-util"

//Admin auth
export const AdminLoginRequest = async (data: AdminLoginType) => {
    const response = await Axios.post<any, AxiosResponse>('admin/login', data)
    return response
}

export const AdminChangePasswordRequest = async (data) => {
    const response = await Axios.post<any, AxiosResponse>('admin/password-change', data)
    return response
}


//Users
export const getAdminUsersRequest = async () => {
    const response = await Axios.get<any, AxiosResponse>('users/users-list')
    return response
}

//Product
export const getAdminProductsRequest = async () => {
    const response = await Axios.get<any, AxiosResponse>('books')
    return response
}

//Admin Orders
export const getAdminOrdersRequest = async () => {
    const response = await Axios.get<any, AxiosResponse>('orders')
    return response
}

export const removeAdminOrdersRequest = async (order_id: string | number) => {
    const response = await Axios.delete<any, AxiosResponse>(`orders/${order_id}`)
    return response
}