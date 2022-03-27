const multer = require('multer');

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"public/post_faces");
    },
    filename: (req, file, cb) => {
        let file_ext = (file.originalname).split('.');
        file_ext = file_ext[file_ext.length - 1];
        //path.extname(file.originalname)
        if(typeof req.user != 'undefined') cb(null,req.user.username + Date.now() + '.' + file_ext);
        else cb('Lütfen giriş yapınız.', false);
    }
})

const imageFilter = (req, file, cb) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
        cb(null, true);
    }else{
        cb('Dosya uzantısı desteklenmiyor. Desteklenen dosya tipleri .png ve .jpeg', false);
    }
}

const imageUpload = multer({
    limits: { 
        fileSize: 20480000
    },
    storage: myStorage, fileFilter: imageFilter, onError : function(err, next) {
        console.log('error', err);
        next(err);
    }
})

module.exports = imageUpload;