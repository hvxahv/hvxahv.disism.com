---
title: 'GET STARTED'
date: '2022-10-11T05:35:07.322Z'
---

Now, we need to implement a completely decentralized social network.

**Features it has**

Social network: On the federation universe, the protocol uses the [ActivityPub](https://www.w3.org/TR/activitypub/) protocol.

Instant messaging integration: uses the [matrix.org](http://matrix.org) protocol.

Storage: Uses the [IPFS](https://ipfs.tech/) protocol.

**Fediverse**

It is all decentralized and our ultimate goal is to implement an elegant and easy-to-use application that gives everyone the right to control their own data and privacy.

For privacy, it does not collect any data from users, much less analyze and track them.

Decentralize, embrace open source, and firmly protect privacy and freedom.

---
**Current services implemented**

| Services | Description |
| --- | --- |
| Account | Acts as an account system and handles the user's account. |
| Activity | As a service that supports ActivityPub. |
| Actor | Support ActivityPub accounts. |
| Article | Use this service when posting articles or statuses. |
| Auth | Certification Services. |
| Channel | ActivityPub service actor, publish broadcast, store using ipfs. |
| Device | Device management support. |
| FS | File system services. |
| Message | Serving matrix.org instant messaging. |
| Notify | Acts as a notification server for notifying clients. |
| Public | Services where the server can disclose content. |
| Saved | IPFS-based storage service. |

---


**In a development environment, how do I get it to work?**

You can check out this repository [Infra4dev](https://github.com/hvxahv/infra4dev) and use [terraform](https://www.terraform.io/) to build a docker-based development environment.

Dependencies to install [what does it install?](https://github.com/hvxahv/infra4dev#resource-list-what-does-it-install)

Follow the README file for this repository to quickly start the development environment dependencies.

**then clone hvx**

```bash
git clone https://github.com/hvxahv/hvx.git
```

[https://github.com/hvxahv/hvx](https://github.com/hvxahv/hvx)

**After installing the database? Next**

Prepare the configuration file

Local configuration file: modify `conf/.hvx.yaml` configuration file.

Online preview: [https://github.com/hvxahv/hvx/blob/main/conf/.hvx.yaml](https://github.com/hvxahv/hvx/blob/main/conf/.hvx.yaml)

**Create database and object storage bucket**

Use [hvxctl](https://github.com/hvxahv/hvx/tree/main/hvxctl) to create the database `cd hvxctl/`

Source code: [https://github.com/hvxahv/hvx/blob/main/hvxctl/cmd/create.go](https://github.com/hvxahv/hvx/blob/main/hvxctl/cmd/create.go)

```bash
go build && chmod +x hvxctl
```

Create a database named hvxahv

```bash
. /hvxctl create db hvxahv
```

Create the object storage bucket, since minio is used, the command example is as follows

```bash
. /hvxctl create fs minio
```

**start microservice**

`cd hack`

```bash
. /run.sh <servicesName>
## start gateway
. /run.sh gw
```

**Build all microservices**

``cd hack``

```bash
. /build.sh all
```

**Use docker build image and start all microservices with [docker-compose](https://github.com/hvxahv/hvx/blob/main/build/docker-compose.yaml)**

```bash
# build and start...
. /docker up
# down docker-compose and remove images and rebuild images and docker-compose up
. /docker dup
# down
. /docker down
```

**Check the README of [APIs](https://github.com/hvxahv/hvx/tree/main/APIs) to get gRPC installed**

**For the API interface, you can check the specific `proto` in the `/APIs/proto/` directory.**

For example: [https://github.com/hvxahv/hvx/blob/main/APIs/proto/v1alpha1/public/public.proto#L10](https://github.com/hvxahv/hvx/blob/main/APIs/proto/v1alpha1/public/public.proto#L10)

API documentation will be written in the future, but it would be more efficient to look at the proto files directly during development.

**Some notes**

You will get a lot of details about this project in the [APIs](https://github.com/hvxahv/hvx/tree/main/APIs) directory, especially in the [proto](https://github.com/hvxahv/hvx/tree/main/APIs/proto/v1alpha1) directory.

The [cmd](https://github.com/hvxahv/hvx/tree/main/cmd) directory contains the specific implementation of the program, roughly the same structure for each program, with the implementation code placed in `cmd/<serviceName>/internal` ,