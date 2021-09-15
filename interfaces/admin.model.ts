export interface AdminLoginType {
    email: string,
    password: string
}
export interface AdminChangePasswordType {
    email: string;
    password: string | number;
    new_password: string | number;
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
