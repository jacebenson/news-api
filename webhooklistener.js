require("dotenv").config();
const secret = process.env.SECRET;
const repo = process.env.REPO;
/*
 * Verify GitHub webhook signature header in Node.js
 * Written by stigok and others (see gist link for contributor comments)
 * https://gist.github.com/stigok/57d075c1cf2a609cb758898c0b202428
 * Licensed CC0 1.0 Universal
 */
const exec = require('child_process').exec;
const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const sigHeaderName = 'X-Hub-Signature'
const app = express()
app.use(bodyParser.json())

function verifyPostData(req, res, next) {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  }

  const sig = req.get(sigHeaderName) || ''
  const hmac = crypto.createHmac('sha1', secret)
  const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8')
  const checksum = Buffer.from(sig, 'utf8')
  if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`)
  }
console.log(`trying to cd to ${repo}, git pull and yarn build`);
  exec('cd ' + repo + ' && git pull && yarn build && yarn deploy');
  return next()
}

app.post('/', verifyPostData, function (req, res) {
  res.status(200).send('Request body was signed')
  //
  exec('cd ' + repo + ' && git pull && yarn publish');
})

app.use((err, req, res, next) => {
  if (err) console.error(err)
  res.status(403).send('Request body was not signed or verification failed')
})

app.listen(process.env.PORT)
