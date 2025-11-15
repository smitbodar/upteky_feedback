import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import "./App.css";

function App() {
  const API_URL = "https://upteky-feedback.onrender.com/api/feedback"; 

  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0
  });
  const [sortType, setSortType] = useState("");


  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data);
    } catch (err) {
      console.log("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating) {
      alert("Please select a rating by clicking on the stars.");
      return;
    }

    try {
      await axios.post(API_URL, {
        ...form,
        rating: Number(form.rating)
      });

      alert("Feedback submitted!");
      setForm({ name: "", email: "", message: "", rating: 0 });
      fetchFeedbacks();
    } catch (err) {
      console.log("AXIOS ERROR:", err);
      alert("Error submitting feedback");
    }
  };

  // Sorting
const handleSort = (option) => {
  setSortType(option);

  let sorted = [...feedbacks];

  if (option === "highest") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (option === "lowest") {
    sorted.sort((a, b) => a.rating - b.rating);
  } else if (option === "latest") {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  setFeedbacks(sorted);
};


  // Analytics
  const total = feedbacks.length;
  const avgRating =
    total === 0
      ? 0
      : (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);

  const positive = feedbacks.filter((f) => f.rating >= 4).length;
  const negative = feedbacks.filter((f) => f.rating < 3).length;

  return (
    <div className="container">
      <h1>Feedback Dashboard</h1>


      {/* Feedback Form */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <div>
          <label style={{ fontWeight: "bold" }}>Rating:</label>
          <StarRating
            rating={form.rating}
            onChange={(value) => setForm({ ...form, rating: value })}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Analytics */}
      <div className="stats">
        <div className="card">Total Feedback: {total}</div>
        <div className="card">Average Rating: {avgRating}</div>
        <div className="card">Positive (4+): {positive}</div>
        <div className="card">Negative (&lt;3): {negative}</div>
      </div>
            {/* Sorting */}
{/* Sorting Buttons */}
<div className="sort-container">
  <span className="sort-label">Sort:</span>

  <div className="sort-buttons">
    <button
      className={sortType === "latest" ? "active-sort" : ""}
      onClick={() => handleSort("latest")}
    >
      Latest First
    </button>

    <button
      className={sortType === "highest" ? "active-sort" : ""}
      onClick={() => handleSort("highest")}
    >
      Highest Rating
    </button>

    <button
      className={sortType === "lowest" ? "active-sort" : ""}
      onClick={() => handleSort("lowest")}
    >
      Lowest Rating
    </button>
  </div>
</div>



     {/* Review Cards */}
<div className="reviews-list">
  {feedbacks.map((fb, i) => (
    <div key={i} className="review-card">

      {/* Header: avatar + name + date */}
      <div className="review-header">
        <div className="avatar"></div>

        <div>
          <div className="review-name">{fb.name}</div>
         <div className="review-date">
  {new Date(fb.createdAt).toLocaleString()}
</div>

        </div>
      </div>

      {/* Stars */}
      <div className="review-stars">
        {"★".repeat(fb.rating)}
        <span className="empty-stars">
          {"★".repeat(5 - fb.rating)}
        </span>
      </div>

      {/* Message */}
      <div className="review-message">{fb.message}</div>

    </div>
  ))}
</div>

    </div>
  );
}

export default App;
