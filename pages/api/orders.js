import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default async function handle(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get("id");
    if (req.method == "POST") {
        pb.authStore.loadFromCookie(req.headers.cookie);
        const body = JSON.parse(req.body);
        return new Promise((resolve, reject) =>
            pb
                .collection("orders")
                .create({
                    user: body.user,
                    cart: body.cart,
                    address: body.address,
                    payment: body.payment,
                    total: body.total,
                    subtotal: body.subtotal,
                    delivery: body.delivery,
                    status: "pending",
                })
                .then((order) => {
                    res.status(200).json(order);
                    resolve();
                })
                .catch((e) => {
                    res.status(500).json({ message: e.message });
                    reject();
                })
        );
    }
    if (req.method == "GET") {
        pb.authStore.loadFromCookie(req.headers.cookie);
        const order = await pb.collection("orders").getOne(id);
        res.status(200).json(order);
    }

}