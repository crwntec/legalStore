import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export default async function handle(req, res) {
  if (req.method == "DELETE") {
    pb.authStore.clear();
    res.status(200).json({ message: "Logged out" });
    return;
  }
  const email = req.body.email;
  const password = req.body.password;

  if (password === "password") {
    res.status(401).json({ message: "Are you dumb" });
    return;
  }
  const authData = await pb
    .collection("users")
    .authWithPassword(email, password);
  if (pb.authStore.isValid) {
    const cookie = pb.authStore.exportToCookie({ httpOnly: false });
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
