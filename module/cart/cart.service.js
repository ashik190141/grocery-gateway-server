const status = require("http-status");
const myModel = require("./cart.model");
const productModel = require("../product/product.model")

const cartAddIntoDB = async (req, res) => {
    try {
        const data = req.body;
        const document = new myModel(data);
        await document.save();

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
    const query = {email:email}
    const allData = await myModel.find(query).exec();
    
    let allId = []
    for (let i = 0; i < allData.length; i++) {
      let id = allData[i].id;
      allId.push(id);
    }

    const uniqueIDs = Array.from(new Set(allId));
    
    let result=[];
    for (let i = 0; i < uniqueIDs.length; i++){
        let id = uniqueIDs[i];
        let products = allData.filter(data => data.id == id);
        let productInfo = await productModel.findOne({_id:id})
        // console.log(productInfo);
        result.push({
            noOfProduct: products.length,
            name: productInfo.name,
            image: productInfo.image,
            price: productInfo.price,
            id: productInfo._id
        })
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

module.exports = {
    cartAddIntoDB,
    getCartFromDB
};
