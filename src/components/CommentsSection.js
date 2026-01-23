import { useEffect, useState } from "react";
import API from "./API";

export default function CommentsSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/tasks/${taskId}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);

      await API.post(`/tasks/${taskId}/comments`, {
        content: newComment
      });

      setNewComment("");
      fetchComments(); // refresh list after add
    } catch (err) {
      console.error("❌ Error adding comment:", err);
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const safeComments = Array.isArray(comments) ? comments : [];

  return (
    <div className="mt-6">
  <h4 className="font-semibold text-lg mb-3">Comments</h4>

  <ul className="space-y-2">
    {comments.map(c => (
      <li className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm">{c.content}</p>
        <span className="text-xs text-gray-400">
          {new Date(c.createdAt).toLocaleString()}
        </span>
      </li>
    ))}
  </ul>


      <textarea
        className="w-full mt-3 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button
        className="btn btn-primary"
        disabled={!newComment.trim() || loading}
        onClick={handleAddComment}
      >
        {loading ? "Adding..." : "Add Comment"}
      </button>
    </div>
  );
}
