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
    <div className="mt-4">
      <h4>Comments</h4>

      {safeComments.length === 0 && (
        <p className="text-muted">No comments yet.</p>
      )}

      <ul className="list-group mb-3">
        {safeComments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            <p className="mb-1">{comment.content}</p>
            <small className="text-muted">
              {comment.createdAt
                ? new Date(comment.createdAt).toLocaleString()
                : "Just now"}
            </small>
          </li>
        ))}
      </ul>

      <textarea
        className="form-control mb-2"
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
