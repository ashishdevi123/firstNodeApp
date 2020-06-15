const Product = require('../models/product');
var ObjectId = require('mongodb').ObjectId;

exports.getAddProduct = (req, res, next) => {
  console.log("add-prod worked");
  res.render('edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title,req.body.price,req.body.imgurl,req.body.description);
  product.save(()=>{
    res.redirect('/admin/shop');
  });
};

exports.getEditProduct = (req, res, next) => {
  console.log("edit-prod worked");
  const isedit = req.query.edit;
  const prodId = req.params.productId;
  Product.fetchProductById(prodId, (prod)=>{
    res.render('edit-product', {
      product: prod,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: isedit
    });
  });

};

exports.postEditProduct = (req, res, next) => {
  console.log("post edit worked");
  const product = new Product(req.body.title,req.body.price,req.body.imgurl,req.body.description, new ObjectId(req.body._Id));
  product.save(()=>{
    res.redirect('/admin/shop');
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.showProductDetails = (req, res, next) => {
const prodId = req.params.productId
//console.log(prodId);
Product.fetchProductById(prodId, (prod)=>{
  //console.log("prod");
  //console.log(prod);
  res.render('product-detail', 
  { product: prod,
     pageTitle:prod.title, 
     path: '/product'
    });
});

};

exports.getShopData = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin-shop', {
      prods: products,
      pageTitle: 'admin-shop',
      path: '/admin/shop',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.postShopData = (req, res, next) => {
  Product.deleteProductById(req.body.id, ()=>{
    res.redirect('/admin/shop');
  });

};
