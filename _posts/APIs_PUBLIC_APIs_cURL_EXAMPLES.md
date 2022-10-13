---
title: 'APIs_PUBLIC_APIs_cURL_EXAMPLES'
date: '2022-10-11T05:35:07.322Z'
---

# DEVELOPMENT APIs EXAMPLE.
## PUBLIC

### GET INSTANCE
hvxahv.disism.internal:8080/public/instance

REQUEST
```shell
curl --location --request GET 'hvxahv.disism.internal:8080/public/instance'
```
RESPONSE
```json
{
    "code": "200",
    "version": "0.1.0\t",
    "build": "2022-01-01",
    "maintainer": "hvturingga",
    "repo": "github.com/hvxahv/hvxahv",
    "host": "halfmemories.com"
}
```

### POST CREATE ACCOUNT
hvxahv.disism.internal:8080/public/account/create

REQUEST
```shell
curl --location --request POST 'hvxahv.disism.internal:8080/public/account/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "hvturingga",
    "mail": "hvturingga@disism.com",
    "password": "hvxahv123",
    "public_key":  "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw9mcKDv+SHmSgdWMEic6\nRfRwHNOj16chn9vgka+Y32TFACl5Xoutlih6Je+LYoLmOFMlg+51lo4vnO+imCsk\nIqc+U+4Ql7N6s0fn8+x5/fYRaldnv3xV6Vb75sdq07zDF27BfXmTQ+dhmgVDqBcj\nM81MDSjHEu9KkISgTvwsuf2Pu5KQ3vot9jdZK3BMt+GeV3MJpOwpKn7OpPerXp82\nMYM39c825uc9ZnxqkhRgxL1Kw\n+JmKizaeHk8EdsmwGI09pTyFuwzexjx8QJAFsNO\nwYY0qDQrbRPOw0YQFBRCZKsci7vXxcwuFuMK+2G3SIxSEXjUq0bUq93hWjv4H2sC\nMQIDAQAB\n-----END PUBLIC KEY-----"
}'
```
RES
```json
{
  "code": "200",
  "response": "ok"
}
```

### POST LOGIN
hvxahv.disism.internal:8080/auth

REQUEST
```shell
curl --location --request POST 'hvxahv.disism.internal:8080/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "hvturingga",
    "password": "hvxahv123",
    "ua": "chrome"
}'
```
RES
```json
{
  "code": "200",
  "status": "ok",
  "id": "<ACCOUNT_ID>",
  "authorization_token": "<TOKEN>",
  "actor_id": "<ACTOR_ID>",
  "mail": "<MAIL>",
  "device_id": "<DEVICE_ID>"
}
```


