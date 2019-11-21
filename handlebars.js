const exphbs = require("express-handlebars");

const hbs = exphbs.create({
    extname: ".hbs",
    helpers: {
        ifCond: function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

module.exports = hbs;
