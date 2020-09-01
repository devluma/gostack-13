import React from "react";

export default function Header({ title, description }) {
  return (
    <header>
      <h1>{title}</h1>
      <span>{description}</span>
      <hr />
    </header>
  );
}
