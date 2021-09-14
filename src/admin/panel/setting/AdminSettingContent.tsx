import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { LoadingBtn } from "../../../../components/Loading/LoadingBtn"
import { store } from "../../../../provider/storeProvider"
import { AdminChangePasswordRequest, AdminLoginRequest } from "../../../../services/admin"

const AdminSettingContent = () => {

    const { adminUser } = store()
    const [form, setForm] = useState<any>({ email: adminUser.email })
    const [errMessage, setErrMessage] = useState<String>(null)
    const [btnLoading, setbtnLoading] = useState(false)

    const handleChange = useCallback(({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }, [form])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrMessage(null)
        setbtnLoading(true)
        console.log(form);


        try {
            const res = await AdminChangePasswordRequest(form)
            console.log(res);
            setbtnLoading(false)

            toast.success('Success')
        } catch (err) {
            // const { data: { messages } } = err.response
            setErrMessage('Error')

        }


    }
    return (
        <>
            <h1>Change password</h1>
            <div className="admin-form setting-form">
                <div className="admin-form__logo">
                    <img src="/img/logo.jpg" />
                </div>
                <form className="admin-form__content" onChange={handleChange} onSubmit={handleSubmit}>
                    <div className="admin-group">
                        <input name="email" placeholder="Email" value={adminUser.email} readOnly />
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="admin-group">
                        <input type="password" name="password" placeholder="Old password" />
                        <label htmlFor="password">Old Password:</label>
                    </div>
                    <div className="admin-group">
                        <input type="password" name="new_password" placeholder="New password" />
                        <label htmlFor="new_password">New Password:</label>
                    </div>
                    {errMessage && <div className="form-error-messages">{errMessage}</div>}
                    <button type="submit" disabled={btnLoading} >
                        Change
                        {/* {btnLoading && <LoadingBtn />} */}
                        <LoadingBtn />
                    </button>
                </form>
            </div>
        </>
    )
}

export default AdminSettingContent