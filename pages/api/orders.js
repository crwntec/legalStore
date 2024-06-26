import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.searchParams.get("id");
  const cookie = "pb_auth=" + req.cookies["pb_auth"];
  await pb.authStore.loadFromCookie(cookie);
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    return new Promise((resolve, reject) =>
      pb
        .collection("orders")
        .create({
          user: body.user,
          cart: body.cart,
          delivery: body.delivery,
          payment: body.payment,
          total: body.total,
          subtotal: body.subtotal,
          deliveryFee: body.deliveryFee,
          status: 0,
        })
        .then((order) => {
          res.status(200).json(order);
          pb.collection("carts")
            .delete(body.cart.id)
            .then(() => resolve())
            .catch((e) => console.log(e));
        })
        .catch((e) => {
          res.status(500).json({ message: e.message });
          reject();
        })
    );
  }
  if (req.method == "GET") {
    if (!id) {
      const orders = await pb.collection("orders").getList(1, 50, {
        filter: `user.id="${pb.authStore.model.id}"`,
      });
      res.status(200).json(orders);
      return;
    }
    const order = await pb.collection("orders").getOne(id);
    res.status(200).json(order);
  }
}
