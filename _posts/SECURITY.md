---
title: 'SECURITY'
date: '2022-10-11T05:35:07.322Z'
---
Please select your trusted instance using the open source auditable client

## HVXAHV's Security Policy Report

## Principles

All users' passwords should be stored encrypted to prevent hacking leading to database compromise.

The server should not store the user's private key.

Issued Token should not be stored in the server and a unique device ID (device hash) should be used to verify the legitimacy of the client.

Saved feature personal files stored in IPFS should be stored encrypted.

## TOKEN

Token stored information settings.

1. EMail: the user's email address
2. ID: The user's account ID
3. Username: the user's account name
4. Device: Unique Login Device Hash

The API middleware can get the above personal information from the Token, especially the Device field, which is very important, it is used to identify the ID of the current login device, the unique Hash issued when the user logs in, it is used in the management of the device, for example, when logging out or can query the login device details through the Hash, the operation of the Token is very frequent, so it is necessary to implement a caching mechanism.

[https://datatracker.ietf.org/doc/html/rfc7519](https://datatracker.ietf.org/doc/html/rfc7519)

## Private key

### Private key storage and exchange process when logging in to multiple terminals

Regarding the process of passing the private key during login, the server should not save the user's private key, which should be given to the user and stored only in the user's client.

When registering for the first time, an asymmetric key pair is generated. The login device and the device address should be stored in the server so that the second client can send the address of the requested private key when logging in.

The client saves the private key in local storage, and it is necessary to send a warning to the user that he must back up his private key when he registers successfully or logs out.

In case there is only one client logging in, if the private key is not saved after logging out, the next log-in will not be possible.

If one client already exists, when the second or third client logs in, it will send a private key request to the existing client, including its newly generated public key, and make a request to the requested client for authorization to log in.

When the requested client agrees, it will also generate a key pair and send the public key and the passed private key.

Send your own private key to the requesting client.

When the clients call each other's private keys, the server only plays the role of forwarding, and the private keys are sent between the two clients by end-to-end encryption.

When the last client logs out and logs in again, after entering the user name and password, the user needs to add his private key to the client manually to continue using it. In other words, the server will never save the user's private key, and only after adding the private key to the client can the account continue to be used, otherwise the account will be permanently lost.

Although there is some operation tedious process in the above logic, it is unavoidable.

When logging in, it is necessary to retrieve the number of logged-in devices from the server and return a list of already logged-in ones. When the user selects any client, the request is sent to the selected client, and then the login is confirmed in the client that receives the request, and the private key exchange begins, sending the already existing private key to the requesting client.

### Encryption algorithms for exchanging private keys

Request and send keys by communicating with an end-to-end encrypted client. You can exchange your private keys without trusting the server.

With ECDH, a new RSA key is generated for each exchange, the data is set in a cache for two minutes, and is discarded immediately after the exchange. The private keys of both parties are not stored, only the public key can be intercepted, so a certain level of security is guaranteed.

`[Diffie-Hellman key exchange...](*https://datatracker.ietf.org/doc/html/rfc2631*)`

## File encryption

### Saved

When the user uses the saved function, the server should not be involved in the file encryption process, only the hash of the file and the type of the file should be saved.

It is known that IPFS does not encrypt files, and when other people know the CID of the file, they can access the file, so you need to encrypt the file when uploading it, and then submit the returned cid to the client to decrypt the file when downloading. The current setting of hvxahv-web is to use openpgp to encrypt the file asymmetrically and use the client's local private key to decrypt it when downloading.

## HTTP SIGNATURES

[draft-cavage-http-signatures-12 (ietf.org)](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-12)

## Double Ratchet Algorithm Implementation Description

[https://signal.org/docs/specifications/doubleratchet/](https://signal.org/docs/specifications/doubleratchet/)

We take security very seriously, if you find any security issues, please contact

security@disism.com

## Design of HTTP request signatures

[https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-11](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-11) Draft.

Because the server should not know the user's private key, we forbid the server to access the user's private key, and the user's private key should only be saved in the client and the user's own backup file, so the active signature should be done in the client, but I found in the process of implementing the client-side signature that the client does not have a better way to handle a large number of signatures, such as a scenario where the recipients are hundreds or even thousands long, so to So in order to cope with this scenario, I decided to add another key system to the hvx activitypub feature, whose key pair is only used to support activitypub, while other privacy-related scenarios keep the user's private key in the client, which is still not allowed to be accessed by the server.

Notes.

When sending messages to the Mastodon server, we found that Mastodon must verify the user's identity by signing, and if the actor's private key is stored locally, it needs to sign locally and then submit the signature to the server before sending, but we found serious performance problems when doing rsa private key signing on the client side, which is why the key supporting the activitypub feature is placed on the server.

So in the tradeoff of privacy, we decided to design two key systems, one for asymmetric encryption of accounts and one for activitypub key pairs.

---

When receiving inbox messages, a custom oauth client authenticator needs to be written for HTTP signature-based client authentication.