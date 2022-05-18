const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
let app = EXPRESS();

app.use(BODY_PARSER.json({ limit: "50mb" }))

// Load all routes.
require('./scripts')(app);

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(
        'Express server listening on port %d in %s mode',
        server.address().port,
        app.settings.env
    );
});

module.exports = app;