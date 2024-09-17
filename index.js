import express from "express";
import cors from "cors";
import { getPosts, addPosts, deletePosts, likePosts } from "./db/consultas.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Servidor iniciado en ${port}!`));

// GET
app.get("/posts", async (req, res) => {
  const resultado = await getPosts();
  res.json(resultado);
  console.log("Base de datos cargada");
});

// POST
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  console.log(req.body);
  await addPosts(titulo, img, descripcion);
  res.json({ titulo, img, descripcion });
});

// DELETE
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  await deletePosts(id);
  res.send(`Delete record with id ${id}`);
});

//PUT
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  await likePosts(id);
  res.send(`Actualizado`);
});
