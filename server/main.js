const express = require("express");
const app = express();
const axios = require("axios");
const formidable = require("formidable");
const fs = require('fs-extra');
const http = require('http');
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const multer = require("multer");
const os=require('os')
const tmpDir = os.tmpdir();
const httpServer = http.Server(app);
const $ = require('jquery')

var CSDKApiKey = "1a1da168095542948cecc05b9f917aec"
var imsRef = window.__adobe_cep__.imsConnect();
var accounts = window.__adobe_cep__.imsFetchAccounts(imsRef, CSDKApiKey);

var xml = parseXml(accounts)
var imsToken = JSON.parse(xml.getElementsByTagName("IMSProfile")[0].innerHTML).access_token
window.imsToken = imsToken;

httpServer.listen(8080);
window.$ = $

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

app.use(express.static(path.join(__dirname, "../client")));

app.get("/root", (req, res, next) => {

  const requestConfig = {
    url: "https://cc-api-storage.adobe.io/files",
    headers: {"x-api-key": CSDKApiKey, "Authorization": "Bearer " + imsToken }
  }

  axios(requestConfig)
    .then(ccResponse => {
      res.json(ccResponse.data);
    })
    .catch(err => {
      if (err.response) { res.status(err.response.status).json(err.response.data) }
      else if (err.request) { res.status(504).json({"error": "No response from CC."}) }
      else res.status(500).json({"error": err.message});
    });
});

function parseXml(xmlStr) {
    return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
};