import { hash, compare } from "bcryptjs"
import hashObj from "object-hash"
import Cookies from 'js-cookie'

export const getAdminUser = () => Cookies.get('admin-session')


export const hashPassword = async (password: string) => {
    const passwordHash = hash(password, 35)
    return passwordHash
}

export const hashObject = async (object: object) => {
    const objectHash = hashObj(object)
    return objectHash
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const isValid: boolean = await compare(password, hashedPassword)
    return isValid
}



export const convertNormalDate = (givenDate: any, time = false) => {
    const date = new Date(givenDate)
    const clock = (date.getHours() <= 10 ? `0${date.getHours()}` : date.getHours()) + ":" + (date.getMinutes() <= 10 ? `0${date.getMinutes()}` : date.getMinutes())
    const result = (date.getDate() <= 10 ? `0${date.getDate()}` : date.getDate())
        + "." + (date.getMonth() + 1 <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1)
        + "." + date.getFullYear()

    return `${time && clock + "  " + result}`
}







