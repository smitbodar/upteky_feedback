import React, { useState } from "react";

function StarRating({ rating, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: "5px", cursor: "pointer", fontSize: "24px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            color:
              star <= (hover || rating)
                ? "#ffbf00"
                : "#ccc",
            transition: "0.2s"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
