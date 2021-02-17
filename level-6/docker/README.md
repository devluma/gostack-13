# DOCKER

# POSTGRES DIGITALOCEAN cloud-nodejs 
```bash
docker run -d --restart=unless-stopped --name postgresql -e POSTGRESQL_USERNAME=root -e POSTGRESQL_PASSWORD=fede66c2e9e7f6bc7d27c929f162e19cSS -e POSTGRESQL_DATABASE=gostack14 -p 35432:5432 bitnami/postgresql:latest
```

# MONGODB DIGITALOCEAN cloud-nodejs 
```bash
docker run -d --restart=unless-stopped --name mongodb -e MONGODB_USERNAME=root -e MONGODB_PASSWORD=ca9f183a5f5ee17cf1f932fc1b6d8d64SS -e MONGODB_DATABASE=gostack14 -p 47017:27017 bitnami/mongodb:latest
```

# REDIS DIGITALOCEAN cloud-nodejs 
```bash
docker run -d --restart=unless-stopped --name redis -e REDIS_PASSWORD=c6069fbcdf5f8fdd506013629156542dSS -p 56379:6379 bitnami/redis:latest
```