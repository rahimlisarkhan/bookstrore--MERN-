export interface AdminLoginType {
    email: string,
    password: string
}

export interface AdminLoginResponse {
    data: {
        user: {
            _id: string
            fullname: string,
            email: string,
        }
    }

}
