const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Welcome Home!</h1>
    Routes:
    <ul>
        <li><a href="/log">getLog()</a></li>
        <li><a href="/log/entry/:id">getEntry(id)</a></li>
    </ul>
</body>
</html>`);
});

router.use('/log', require('./log'));
    
module.exports = router;