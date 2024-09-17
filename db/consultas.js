import { pool } from "./db.js";

const getPosts = async () => {
  const consulta = "SELECT * FROM POSTS ORDER BY id ASC";
  const result = await pool.query(consulta);
  return result.rows;
};

const addPosts = async (titulo, img, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)";
  const values = [titulo, img, descripcion];
  const result = await pool.query(consulta, values);
  console.log("Post agregado con exito");
  return result.rows; //Es necesaria esta linea?
};

const deletePosts = async (id) => {
  const consulta = "DELETE FROM posts WHERE id=$1";
  const values = [id];
  const result = await pool.query(consulta, values);
  console.log("Informacion del id " + id + " ha sido eleminada");
  return result.rows; //Es necesaria esta linea?
};

const likePosts = async (id) => {
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id=$1";
  const values = [id];
  const result = await pool.query(consulta, values);
  console.log("Informacion del id " + id + " ha sido actualizada");
  return result.rows;
};

export { getPosts, addPosts, deletePosts, likePosts };
