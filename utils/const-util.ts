import { hash, compare } from "bcryptjs"

export const hashPassword = async (password: string) => {
    const passwordHash = hash(password, 12)
    return passwordHash
}

export const verifyPassword = async (password: string, hashedPassword:string) => {
    const isValid: boolean = await compare(password, hashedPassword)
    return isValid
}

export const convertNormalDate = (givenDate: any) => {
    const date = new Date(givenDate)
    const result = (date.getDate() <= 10 ? `0${date.getDate()}` : date.getDate())
        + "." + (date.getMonth() + 1 <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1)
        + "." + date.getFullYear()
    return result
}





