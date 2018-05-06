# Commands for Quick Docker Servers

* [MongoDB](#mongodb)
* [Postgres](#postgres)
* [Mysql](#mysql)
* [ElasticSearch](#elasticsearch)

## MongoDB

#### Keep data in container volume

```sh
docker run -d \
  --name mongodb \
  -p 127.0.0.1:27017:27017 \
  mongo:3 bash -c 'mongod --logappend --storageEngine=wiredTiger'
```

#### Keep data in 'mounted volume/path' at `$HOME/mongodb`

```sh
mkdir -p $HOME/mongodb/data
docker run -d \
  -v $HOME/mongodb:/data \
  --name mongodb \
  -p 127.0.0.1:27017:27017 \
  mongo:3 bash -c 'mongod --logpath /data/mongodb.log --logappend --dbpath /data/data --storageEngine=wiredTiger'
```

## Postgres

#### Store data inside container volume

```sh
docker run -d \
  --name postgresdb \
  --restart on-failure:15 \
  -p 127.0.0.1:5432:5432 \
  -e POSTGRES_USER=$USER \
  -e POSTGRES_DB=$USER \
  -e POSTGRES_INITDB_ARGS="--data-checksums" \
  postgres:9.6-alpine
```

**IMPORTANT:** If you see the following error, see fix below:

```sh
$ psql
psql: could not connect to server: Socket operation on non-socket
        Is the server running locally and accepting
        connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

To access server via your 'local' terminal and code: configure connection with the local address `127.0.0.1`


```sh
# Option 1: Explicitly set `--host` CLI argument
createdb --host 127.0.0.1 foobar

# Option 2: Set host for all postgres CLI tools via $PGHOST
export PGHOST=127.0.0.1
psql # should work
```

## MySQL

```sh
# CRITICAL TODO: CHANGE PASSWORD!!!
docker run -d \
  -p 127.0.0.1:3306:3306 \
  --name mysql-$USER \
  -e MYSQL_DATABASE=$USER \
  -e MYSQL_ROOT_HOST='172.*.*.*' \
  -e MYSQL_ROOT_PASSWORD='p@ssw0rd' \
  mysql/mysql-server:5.7
```


## ElasticSearch

```sh
docker run -d \
  --name elastic01 \
  -p 127.0.0.1:9200:9200 \
  -p 127.0.0.1:9300:9300 \
  -v /elastic:/data \
  elasticsearch bash -c 'elasticsearch --cluster.name es_cluster --node.name elastic01 --path.data /data/db --path.logs /data/logs '
```



### Misc: Password Generator

```sh
pwgen -N 1 -s 20
```
