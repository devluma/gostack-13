const express = require("express");
const { uuid } = require("uuidv4");

const routes = express.Router();
const repositories = [];

routes.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? repositories.filter((repository) => repository.title.includes(title))
    : repositories;

  return response.json(results);
});

routes.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

routes.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  const updateRepository = { ...repositories[repositoryIndex], ...repository };

  repositories[repositoryIndex] = updateRepository;

  return response.json(updateRepository);
});

routes.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

routes.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = repositories[repositoryIndex];
  const newLike = {
    likes: repository.likes + 1,
  };

  const updateLikes = { ...repository, ...newLike };

  repositories[repositoryIndex] = updateLikes;

  return response.json(updateLikes);
});

module.exports = routes;
