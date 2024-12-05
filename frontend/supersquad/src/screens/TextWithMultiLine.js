import React from "react";

export default function TextWithMultiLine({ text }) {
  return (
    <div>
      {text &&
        text.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            {index < text.split("\n").length - 1 && <br />}
          </span>
        ))}
    </div>
  );
}
