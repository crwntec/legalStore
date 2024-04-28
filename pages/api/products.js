import products from "../../data/products"
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default function handle(req, res) {
    res.status(200).json(products)
}