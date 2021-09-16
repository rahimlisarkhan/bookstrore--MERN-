import { useState } from "react";
import { ProductCard } from "../../../../components/Card/ProductCard"
import { Modal } from "../../../../components/Modal/Modal";
import AdminProductForm from "./AdminProductForm";


const AdminProductTab = ({ products }) => {
    console.log(products);
    const [close, setClose] = useState(false)

    return (
        <>
            <h1>Product Tab</h1>

            <div className="user-list">
                {products && products.map((product) => (
                    <>
                        <ProductCard setClose={setClose} key={product._id} product={product} />
                        {close === product._id && <Modal setClose={setClose}>
                            <AdminProductForm product={product} />
                        </Modal>}
                    </>
                ))}
            </div>
        </>
    )
}
export default AdminProductTab