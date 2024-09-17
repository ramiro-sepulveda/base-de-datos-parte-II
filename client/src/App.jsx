import { successToast, errorToast } from "./utils/toast";
import { useEffect, useState } from "react";

import {
  getPosts,
  addPost,
  deletePost,
  likePost,
} from "./services/postService";

import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [refresh, setrefresh] = useState(0);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        errorToast("Error al obtener los posts");
      });
    console.log("refresh");
  }, [refresh]);

  const createPost = (post) => {
    addPost(post)
      .then((data) => {
        setrefresh(refresh + 1);
        successToast("Post creado correctamente");
      })
      .catch((err) => {
        errorToast("Error al crear el post");
      });
  };

  const deletePostById = (id) => {
    console.log(id);
    deletePost(id).then(() => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
      successToast("Post eliminado correctamente");
    });
  };

  const likePostById = (id) => {
    likePost(id).then(() => {
      const newPosts = posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes + 1,
          };
        }
        return post;
      });
      setPosts(newPosts);
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">📷 Like Me 📷</h1>
      <main className="row">
        <section className="col-12 col-md-4 mt-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2>Add Post</h2>
              <AddPost createPost={createPost} />
            </div>
          </div>
        </section>
        <section className="col-12 col-md-4 mt-5">
          {posts.map((post) => {
            return (
              <CardPost
                key={post.id}
                post={post}
                deletePostById={deletePostById}
                likePostById={likePostById}
              />
            );
          })}

          {posts.length === 0 && (
            <div className="card">
              <div className="card-body">
                <h2>No hay posts</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
