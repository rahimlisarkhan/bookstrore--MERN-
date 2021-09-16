import { useCallback, useState } from "react"


const AdminProductForm = ({ product }) => {
    const [form, setForm] = useState({ ...product })

    const handleChange = useCallback(({ target: { name, value } }) => {
        setForm({ ...form, [name]: value })
    }, [form])


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {

        } catch (err) {
        }

    }
    return (
        <form className="user-form__content" onChange={handleChange} onSubmit={handleSubmit}>
            <div className="user-group">
                <input type="text" name="author" placeholder="Author" value={form.author} />
            </div>
            <div className="user-group">
                <input name="text" placeholder="Name" value={form.name} />
            </div>
            <div className="user-group">
                <input name="text" placeholder="Title" value={form.title} />
            </div>
            <div className="user-group">
                <input name="text" placeholder="Description" value={form.description} />
            </div>
            <div className="user-group">
                <input name="text" placeholder="Price" value={form.price} />
            </div>
            {/* {errMessage && <div className="form-error-messages">{errMessage}</div>} */}
            <button type="submit">Change</button>
        </form>
    )
}

export default AdminProductForm