const router = require("../routes");

router
const buildHome = async (req, res) => {
  //#swagger.tags = ['Home']
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API travel log</title>
    <link rel="stylesheet" href="/styles/styles.css">
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>
<body>
    <h1>Welcome Home!</h1>
    <h2>Routes:</h2>
    <a href="/log">getLog()</a>
    <a href="/api-docs">Swagger</a>
</body>
</html>`);
};

module.exports = {
  buildHome,
};
