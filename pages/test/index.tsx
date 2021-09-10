import { Axios } from "../../utils/axios-util"


const test = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault()
        Axios.get('/basket')
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Share</button>
        </form>
    )
}


export default test
