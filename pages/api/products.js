import products from "../../data/products"

export default function handle(req, res) {
    res.status(200).json(products)
}