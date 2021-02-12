#!/bin/bash

docker stop gostack_postgres && docker rm gostack_postgres && docker rmi -f gostack_postgres
docker run --name gostack_postgres -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=gobarber -p 5432:5432 -d postgres:12
docker image tag postgres:12 gostack_postgres:latest
