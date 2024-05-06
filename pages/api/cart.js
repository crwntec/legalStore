import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const user = url.searchParams.get("user");
  const cartId = url.searchParams.get("id");
  const cookie = 'pb_auth='+req.cookies["pb_auth"];

  await pb.authStore.loadFromCookie(cookie);
  if (req.method == "GET") {
    if (cartId) {
      return new Promise((resolve, reject) =>
        pb
          .collection("carts")
          .getOne(cartId)
          .then((cart) => {
            res.status(200).json(cart);
            resolve();
          })
          .catch((e) => {
            res.status(500).json({ message: e.message });
            reject();
          })
      );
    }
    if (user) {
      return new Promise((resolve, reject) =>
        pb
          .collection("carts")
          .getFirstListItem(`user.id="${user}"`)
          .then((cart) => {
            res.status(200).json(cart);
          })
          .catch((e) => {
            if (e.status == 404) {
              pb.collection("carts")
                .create({ user: user })
                .then((cart) => {
                  res.status(200).json(cart);
                  resolve();
                })
                .catch((e) => {
                  res.status(500).json({ message: e.message });
                  reject();
                });
            } else {
              res.status(500).json({ message: e.message });
              reject();
            }
          })
      );
    }
  }
  if (req.method == "PUT") {
    return new Promise((resolve, reject) =>
      pb
        .collection("carts")
        .update(cartId, req.body)
        .then((cart) => {
          res.status(200).json(cart);
          resolve();
        })
        .catch((e) => {
          res.status(500).json({ message: e.message });
          reject();
        })
    );
  }
}
