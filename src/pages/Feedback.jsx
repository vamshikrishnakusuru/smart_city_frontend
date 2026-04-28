import { useState, useEffect } from "react";

function Feedback() {
  const user = JSON.parse(localStorage.getItem("auth"));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [feedbackList, setFeedbackList] = useState(() => {
    const stored = localStorage.getItem("feedback");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const userFeedback = feedbackList.filter(
    (f) => f.username === user?.username
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Please provide rating and comment");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      username: user?.username,
      rating,
      comment,
      date: new Date().toLocaleString(),
    };

    setFeedbackList([...feedbackList, newFeedback]);

    setRating(0);
    setComment("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Feedback</h1>

      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-10"
      >
        <div className="mb-6">
          <p className="mb-3 text-slate-400">Rate our services:</p>

          <div className="flex gap-3 text-2xl cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={
                  star <= rating
                    ? "text-yellow-400"
                    : "text-slate-600"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Write your feedback..."
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 mb-6"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="bg-cyan-500 px-6 py-2 rounded hover:bg-cyan-600 transition"
        >
          Submit Feedback
        </button>
      </form>

      {/* Feedback History */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Your Feedback History ({userFeedback.length})
        </h2>

        {userFeedback.length === 0 ? (
          <p className="text-slate-400">
            You have not submitted feedback yet.
          </p>
        ) : (
          <div className="space-y-4">
            {userFeedback.map((fb) => (
              <div
                key={fb.id}
                className="bg-slate-900 p-6 rounded-xl border border-slate-800"
              >
                <div className="flex justify-between mb-3">
                  <div className="text-yellow-400 text-lg">
                    {"★".repeat(fb.rating)}
                  </div>

                  <span className="text-slate-400 text-sm">
                    {fb.date}
                  </span>
                </div>

                <p className="text-slate-300">
                  {fb.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;