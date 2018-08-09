FROM mysql/mysql-server:5.7

COPY ./schema.sql /docker-entrypoint-initdb.d/

COPY ./seed.sql /docker-entrypoint-initdb.d/

COPY ./zaggregate.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_HOST=%

ENV MYSQL_ALLOW_EMPTY_PASSWORD=true
