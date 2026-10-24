
import { useEffect, useState } from 'react';
import axios from 'axios';
function BlogUI() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  

  useEffect(() => {
  getPosts();
  }, []);
 
  // get all post from DB
  const getPosts=async () => {
    try {
    setLoading(true);
    const response = await axios.get('http://localhost:8001/posts');
    setPosts(response.data.posts);
    setLoading(false);
    console.log("response.data:", response.data);
    setError(null);
    } catch (error:any) {
      console.error('Error fetching posts:', error);
      setLoading(false);
      setError(error.message || 'server error');
    }
  }


// creating post
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    try {
      await axios.post('http://localhost:8001/posts', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      getPosts();

      setTitle('');
      setContent('');
      setShowForm(false);
      setError(null);
      setImage(null);
    } catch (error: unknown) {
      console.error('Error creating post:', error);
      const responseMessage = axios.isAxiosError(error) ? error.response?.data?.message : undefined;
      setError(typeof responseMessage === 'string'
        ? responseMessage
        : error instanceof Error ? error.message : 'server error');
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8001/posts/${id}`);
      setError(null);
      getPosts();
    } catch (error:any) {
      setError(error.message || 'server error');
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-full border-4 border-t-blue-500 border-gray-200 w-12 h-12 animate-spin"></div>
          <p className="ml-4 text-white text-lg font-semibold">Loading...</p>
        </div>
      )}
      {/* Navbar */}
      {errors && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-4 text-center">
          <p className="font-semibold">Error: {errors}</p>
        </div>
      )}
      <header className="sticky top-0 z-10 bg-slate-900 text-white shadow-lg">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Blog<span className="text-blue-400">Post</span>
          </h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-500 px-5 py-2.5 font-semibold transition hover:bg-blue-600"
          >
            {showForm ? 'Cancel' : '+ Add Post'}
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-5 py-10">
        <section className="mb-8">
          <p className="mb-2 font-semibold uppercase tracking-widest text-blue-600">
            Your personal space
          </p>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Discover your thoughts.
          </h2>
          <p className="mt-2 text-slate-600">
            Write, share, and manage your blog posts in one place.
          </p>
        </section>

        {/* Add post form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Create a new post
            </h3>

            <input onChange={(e) => setImage(e.target.files?.[0] || null)} type="file" accept="image/*" className='border-2 border-indigo-700'/>
            <p className="text-sm text-slate-500">
              {image ? `Selected image: ${image.name}` : 'No image selected'}
            </p>

            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Publish Post
            </button>
          </form>
        )}

        {/* Post count */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Latest Posts</h3>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {posts.length} posts
          </span>
        </div>

        {/* Post cards */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-slate-800">
              No posts yet
            </h3>
            <p className="mt-2 text-slate-500">
              Create your first post and share your thoughts.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              + Create your first post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article
                key={post._id ?? post.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <img src={post.image} alt={post.title} className="mb-4 rounded-lg object-fit" />
                <h4 className="mb-3 break-words text-xl font-bold text-slate-900">
                  {post.title}
                </h4>

                <p className="mb-6 flex-1 whitespace-pre-wrap break-words leading-7 text-slate-600">
                  {post.content}
                </p>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    onClick={() => deletePost(post._id)}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        Built with React, Express & MongoDB
      </footer>
    </div>
  );
}

export default BlogUI;
