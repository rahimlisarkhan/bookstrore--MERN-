
export const ProductCard = ({ product, setClose }) => {
    return (
        <div className="product-card" onClick={() => setClose(product._id)}>
            <div className="product-card__image">
                <img src='/img/book.png' />
            </div>
            <div className="product-card__title">
                <div className="product-card__title__author">
                    {product.author}
                </div>
                <div className="product-card__title__desc">
                    {product.title}
                </div>
                <div className="product-card__title__price">
                    {product.price}$
                </div>
            </div>
        </div>
    )
}