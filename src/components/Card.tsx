import { Product } from "../models/product";

const Card = ({ product, buttons }: { product: Product, buttons: { text: string, handler: Function }[] }) => {
    return (
        <div className="card">
            <img src={product.imageUrl} alt="img missing" className="card__image" />
            <h3 className="card__title">{product.title}</h3>
            <p className="card__description">{product.description}</p>
            <p className="card__price">{product.price}$</p>
            {buttons?.map(btn => 
                <button key={btn.text} className="btn card__btn" onClick={() => btn.handler(product)}>{btn.text}</button>
                )}
        </div>
    )
}

export default Card;