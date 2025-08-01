const express = require('express');
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const foodController = require("../controllers/foodController.js");
const wrapAsync = require("../utils/wrapAsync.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`);
    }
})
const upload = multer({storage: storage});

router.post("/admin/add", upload.single('image'), wrapAsync(foodController.addFood) );
router.get("/admin/list",  wrapAsync(foodController.showFoodList) );
router.post("/admin/remove",  wrapAsync(foodController.removeFood) );
router.post("/admin/:id/instock", wrapAsync(foodController.updateInStock));

module.exports = router;