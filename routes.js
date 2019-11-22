const express = require('express');
const router = express();
const hbs = require('./handlebars.js');
const moment = require('moment');
// const driver = require('./models/Driver.js');
const user = require('./models/User');
const database = require('./database.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'flashride',
    api_key: '552268597281925',
    api_secret: 'gRRgmj1IFTC7roM38TlWyG0Ec5I'
});

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.url === '/uploadimage') {
            var allowedType = ['image/png', 'image/jpg', 'image/jpeg'];
            if (allowedType.indexOf(file.mimetype) === -1) {
                return cb('Error invalid file type');
            }
        }
        return cb(null, 'public');

    },
    filename: function (req, file, cb) {
        var fileName = (new Date().getTime()) + "-" + file.originalname;
        return cb(null, fileName);
    }
});

const upload = multer({
    storage: fileStorage
});


database.connect();

router.engine(".hbs", hbs.engine);
router.set("view engine", ".hbs");

var imageName;

router.get('/', function (req, res) {

    user.findOne({ imageurl: 'userImage.png' }).exec().then(function (result) {

        res.render("home", { data: result });
        imageName = result.imageurl;
        console.log(imageName);

    }).catch(function (err) {
        if (err) {
            console.log(err);
            res.json(err);
        }
    });

});

var ImageResult;
var file;

router.post('/upload', upload.single('avtar'), function (request, response, next) {
    file = request.file;
    return next();
}, function (request, response, next) {
    console.log("uploaded image path>>>>>>>", file.path);
    cloudinary.uploader.upload(file.path, function (error, result) {
        if (error) {
            console.log(error);
        }
        console.log(result);
    });

}, function (request, response) {
    response.send(file.path)
});

// router.post('/uploadimage', upload.single('avtar'), function (req, res, next) {

//     file = req.file;
//     cloudinary.uploader.upload(file.path, function (error, response) {
//         if (error) {
//             console.log("error");
//         }
//         console.log("Upload complete!", file.path);
//         console.log(response.url);
//         ImageResult = response.url
//         console.log(ImageResult);
//     });
//     return next();
// }, function (req, res) {

//     var conditions = { imageurl: imageName };
//     console.log(conditions.imageurl);
//     var update = { imageurl: ImageResult };
//     user.updateOne(conditions, update, function (error, result) {
//         console.log(result);
//     });

//     res.send("hello");
// });


module.exports = router;