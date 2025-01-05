const status = require("http-status");
const myModel = require("./cart.model");
const productModel = require("../product/product.model");

const cartAddIntoDB = async (req, res) => {
  try {
    const { email, id } = req.body;
    let quantity = 1;

    const query = { id: id, email: email };
    const cartData = await myModel.findOne(query);

    if (cartData) {
      quantity = cartData?.quantity + 1;
    }

    const updatedDoc = {
      id: id,
      email: email,
      quantity: quantity,
    };

    await myModel.findOneAndUpdate(query, updatedDoc, {
      new: true,
      upsert: true,
    });

    res.json({
      result: true,
      statusCode: status.CREATED,
    });
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: "Failed to insert data",
    });
  }
};

const getCartFromDB = async (req, res) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const allData = await myModel.find(query).exec();

    let result = [];

    for (let i = 0; i < allData.length; i++) {
      let id = allData[i].id;
      // let products = allData.filter((data) => data.id == id);
      let productInfo = await productModel.findOne({ _id: id });
      // console.log(productInfo);
      result.push({
        noOfProduct: allData[i].quantity,
        name: productInfo.name,
        image: productInfo.image,
        price: productInfo.price,
        id: productInfo._id,
      });
    }

    res.json({
      statusCode: status.OK,
      data: result,
    });
  } catch (error) {
    res.json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: "Failed to get data",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    const { inc, email } = req.body;

    const query = { id: id, email: email };
    const cartData = await myModel.findOne(query);

    let quantity = cartData?.quantity;

    if (cartData) {
      quantity += inc;
    }

    const updatedDoc = {
      id: id,
      email: email,
      quantity: quantity,
    };

    await myModel.findOneAndUpdate(query, updatedDoc, {
      new: true,
      upsert: true,
    });

    res.json({
      result: true,
      statusCode: status.CREATED,
    });
  } catch (err) {
    res.json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: "Failed to insert data",
    });
  }
};

module.exports = {
  cartAddIntoDB,
  getCartFromDB,
  updateCart,
};
