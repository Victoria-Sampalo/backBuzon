// src/services/dropbox.js
const { Dropbox } = require('dropbox');
const fetch = require('node-fetch');

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch,
});

module.exports = dbx;