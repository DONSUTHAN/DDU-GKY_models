import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/posts";

const emptyForm = {
  title: "",
  description: "",
  author: "",
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/allposts`);
      const data = await response.json();
      setPosts(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError("Could not load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      author: form.author.trim(),
    };

    try {
      const response = await fetch(
        editingId ? `${API_URL}/updatepost/${editingId}` : `${API_URL}/createpost`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      await loadPosts();
      resetForm();
    } catch (err) {
      setError("Could not save the post.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title || "",
      description: post.description || "",
      author: post.author || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/deletepost/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setPosts((current) => current.filter((post) => post._id !== id));
    } catch (err) {
      setError("Could not delete the post.");
    }
  };

  return (
    <div className="app-shell">
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <main className="container">
        <section className="hero">
          <p className="eyebrow">React + Node + Express + MongoDB</p>
          <h1>Simple Blog CRUD</h1>
          <p className="hero-copy">
            Create, edit, and delete blog posts with a clean full-stack setup.
          </p>
        </section>

        <section className="content-grid">
          <form className="card form-card" onSubmit={handleSubmit}>
            <div className="card-heading">
              <h2>{editingId ? "Update Post" : "Create Post"}</h2>
              <button type="button" className="ghost-button" onClick={resetForm}>
                Clear
              </button>
            </div>

            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Post title"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write the post description"
                rows="5"
                required
              />
            </label>

            <label>
              Author
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
                required
              />
            </label>

            <button className="primary-button" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Post" : "Add Post"}
            </button>

            {error ? <p className="status error">{error}</p> : null}
          </form>

          <section className="card list-card">
            <div className="card-heading">
              <h2>Posts</h2>
              <span className="count">{posts.length}</span>
            </div>

            {loading ? <p className="status">Loading posts...</p> : null}

            {!loading && posts.length === 0 ? (
              <p className="status">No posts yet. Add your first one.</p>
            ) : null}

            <div className="post-list">
              {posts.map((post) => (
                <article className="post-item" key={post._id}>
                  <div className="post-top">
                    <div>
                      <h3>{post.title}</h3>
                      <p className="meta">By {post.author}</p>
                    </div>
                    <p className="date">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <p className="description">{post.description}</p>

                  <div className="actions">
                    <button className="secondary-button" onClick={() => handleEdit(post)}>
                      Edit
                    </button>
                    <button className="danger-button" onClick={() => handleDelete(post._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

