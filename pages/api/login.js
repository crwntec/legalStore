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
  await pb
    .collection("users")
    .authWithPassword(email, password).catch(e=>e.status==400 ? res.status(401).json({message:"Invalid credentials"}): res.status(500).json({message:e}));
  if (pb.authStore.isValid) {
    const cookie = pb.authStore.exportToCookie({ httpOnly: false });
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ 
      user: pb.authStore.model,
     });
  } else{
    res.status(401).json({message:"Invalid credentials"})
  }
  return;
}
