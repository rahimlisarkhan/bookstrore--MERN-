import { AxiosResponse } from "axios"
import { AdminLoginType } from "../interfaces/admin.model"
import { ResponseType } from "../interfaces/response.model"
import { Axios } from "../utils/axios-util"

export const AdminLoginRequest = async (data: AdminLoginType) => {
    const response = await Axios.post<any, AxiosResponse>('admin/login', data)
    return response
}


export const AdminOrdersRequest = async () => {
    const response = await Axios.get<any, AxiosResponse<ResponseType<any>>>('orders')
    return response
}