import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default async function handle(req, res) {
    const data = JSON.parse(req.body);
  await pb.collection("users").create({
    email: data.email,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
    name: data.name,
  }).then(() => {
      res.status(200).json({ message: "User created" });
      return;
  }).catch((err) => {
      res.status(400).json({ message: err.message });
  })
}
