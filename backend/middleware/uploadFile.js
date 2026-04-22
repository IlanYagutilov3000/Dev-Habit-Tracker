const multer = require('multer');
const path = require('path');

// decide where the file will be saves and how you would call them
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },  
    filename: function (req, file, cb) {
        const imageUniqueName = Date.now() + path.extname(file.originalname);
        cb(null, imageUniqueName);
    }
});

const upload = multer({storage: storage});
module.exports = upload