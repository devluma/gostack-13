import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";
import backgroundImg from "./assets/background-header.jpg";
import Header from "./components/Header";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // setRepositories([...repositories, `New repository ${Date.now()}`]);

    const response = await api.post("/repositories", {
      title: `New repository "Desafio LV3 FRONTEND" - ${Date.now()}`,
      url: "https://github.com/devluma/gostack13-level1-backend/",
      techs: ["NODEJS", "REACT", "REACT NATIVE"],
    });

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <>
      <Header title="Repository" description="Projects repositoty." />
      <br />
      <img src={backgroundImg} height={220} width="100%" alt="" />
      <br />

      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
