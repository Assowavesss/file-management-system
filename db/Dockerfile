FROM postgres:15

COPY scripts/ /docker-entrypoint-initdb.d/

WORKDIR /docker-entrypoint-initdb.d/

EXPOSE 5432
