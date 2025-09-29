import React, { useState, useEffect } from 'react';

function PostsList() {
  const [posts, setPosts] = useState([]);      // Estado para almacenar publicaciones
  const [loading, setLoading] = useState(true); // Estado para mostrar "cargando"
  const [error, setError] = useState(null);    // Estado para manejar errores

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener los datos');
        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 10)); // Solo las primeras 10 publicaciones
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Cargando publicaciones...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
