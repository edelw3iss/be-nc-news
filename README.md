# Northcoders News API

## Summary

This API was developed as part of a Northcoders backend project.

After being given the data and seed files, the API has been built up to respond to a set of specified endpoints.  The endpoints enable users to view arrays of articles (with queries), topics and users; to see user-specified articles and comments; to add votes to an article and post and delete comments.

The API is hosted on: https://nc-news-ec.herokuapp.com/api

---

## Information for installing repo locally:

---

### Cloning and Dependencies

To clone repo to local machine:  `git clone https://github.com/edelw3iss/be-nc-news`

To install dependencies:  `npm install`

---

### .env Files

Set up .env.test and .env.development files in order to connect to database.

Into each, add  `PGDATABASE=<database_name_here>`

---

### Seeding Local Database and Testing

To set up databases:  `npm run setup-dbs`

To seed databases:  `npm run seed`

To run tests on app:  `npm test app`

---

### Minimum Versions of Node and Postgres

You need `Node.js v17.1.0` and `Postgres v12.9` installed to run this project