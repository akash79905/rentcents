const express = require("express");
<<<<<<< HEAD
=======
const multer = require('multer');
>>>>>>> upstream/master

const Product = require("../models/product");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images"); //relative to the server.js file
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("/", multer({storage: storage}).single("image"), (req,res,next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Product({
    _id: req.body._id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category,
<<<<<<< HEAD
    owner_id: req.body.userId,
    owner_name : req.body.userName,
    rating : "0"
  });
  console.log(product);
  product.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        "message" : "Product added Succesfully."
      });
    })
    .catch(err => console.log(err));
=======
    imagePath:  url + "/images/" + req.file.filename
  });

  post.save().then(result => {
    //console.log(post);
    res.status(201).json({
      message: 'Post added successfully.',
      post: {
        // id: result._id,
        // name: result.name,
        // price: result.price,
        // description: result.description,
        // city: result.city,
        // state:result.state,
        // main_category: result.main_category,
        // sub_category: result.sub_category,
        // imagePath: result.imagePath
        ...result,
        id: result._id
      }
    });
  });
>>>>>>> upstream/master

});

//get all the products
router.get("/", (req,res,next) => {
  Product.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: documents
      });
    });
});

<<<<<<< HEAD


router.get("/:productId", (req,res,next) => {
  const id = req.params.productId;
  console.log(id);
  Product.findById(id)
  .exec()
  .then(doc => {
      console.log(doc);
      res.status(200).json({
          message : "product fetched successfully",
          product : doc
      });
    })
    .catch(err => console.log(err));
})

/*
app.post("/api/product", (req,res,next) => {
  const post = new Post({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    main_category: req.body.main_category,
    sub_category: req.body.sub_category
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully.'
  });
});
*/



router.get("/", (req,res,next) => {
  Product.find()
    .then(documents => {
     // console.log(documents);
      res.status(200).json({
        message: 'Posts fetched',
        posts: documents
      });
    });

});


// router.get("/", (req, res, next) => {
//   Product.find().then(documents => {
//     res.status(200).json({
//       message: "Products fetched successfully!",
//       posts: documents
//     });
//   });
// })
=======
// get a product by its id
router.get("/:id", (req,res,next) => {
  Product.findById(req.params._id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
>>>>>>> upstream/master

// delete a product by its id
router.delete("/:id",(req,res,next) => {
  Product.deleteOne({ _id: req.params._id }).then(result => {
    console.log('result');
    res.status(200).json({ message: 'Post deleted! '});
  });
});

<<<<<<< HEAD
/*router.route("/").get((req,res) => {
  Product.find((err,data) => {
    if(err)
      return next(err);
    else
      res.json(data);
  })
})
*/
=======

>>>>>>> upstream/master
module.exports = router;
