var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors())

// &access_token={2}
const requestUrl = "https://api.vk.com/method/{0}?{1}&v=5.103";
const ownerId = "-184189403";

export const suggestPost = () => {
    const message = "message";

    const url = `https://api.vk.com/method/wall.post?${ownerId}&${message}&v=5.103`;

    app.get(url, function (req, res, next) {
        console.log(res);
      })
}