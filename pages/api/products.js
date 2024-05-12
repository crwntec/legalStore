import products from "../../data/products"

export default function handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get("id");
    if (id) {
        const product = products.find((product) => product.id == id)
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        return res.status(200).json(product)
    } else {
        return res.status(200).json(products)
    }
}