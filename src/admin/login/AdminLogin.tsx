import { useRouter } from "next/dist/client/router";
import React, { useCallback, useState } from "react";
import { LoadingAdmin } from "../../../components/Loading/LoadingAdmin";
import { store } from "../../../provider/storeProvider";
import { AdminLoginRequest } from "../../../services/admin";


const AdminLogin: React.FC = () => {
    const [form, setForm] = useState<any>({})
    const { adminLogin } = store()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [errMessage, setErrMessage] = useState<String>(null)

    const handleChange = useCallback(({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }, [form])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        setErrMessage(null)

        try {
            const { data: { result: data } } = await AdminLoginRequest(form)

            adminLogin(data.data)
            setLoading(false)
            router.push('/admin/panel')

        } catch (err) {
            const { data: { messages } } = err.response
            setLoading(false)
            setErrMessage(messages)
        }


    }
    return (
        <>
            {loading && <LoadingAdmin opacity={true} />}
            <div className="login-content">
                <div className="admin">

                    <div className="admin-form">
                        <div className="admin-form__logo">
                            <img src="/img/logo.jpg" />
                        </div>
                        <form className="admin-form__content" onChange={handleChange} onSubmit={handleSubmit}>
                            <div className="admin-group">
                                <input name="email" placeholder="email" />
                                <label htmlFor="email">Email:</label>
                            </div>
                            <div className="admin-group">
                                <input type="password" name="password" />
                                <label htmlFor="password">Password:</label>
                            </div>
                            {errMessage && <div className="form-error-messages">{errMessage}</div>}
                            <button type="submit">Sign in</button>
                        </form>
                    </div>

                    <div className="admin-walpaper">
                        <div className="admin-walpaper__title">
                            Welcome to our Website
                        </div>
                        <div className="admin-walpaper__desc">
                            Login to access your admin account
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default AdminLogin