const status = require("http-status");
const myModel = require("./product.model");

const productAddIntoDB = async (req, res) => {
    try {
      let id;
      const allData = await myModel.find().exec();
      if (allData.length == 0) id = 0;
      else id = allData[allData.length - 1].id;
      const newData = req.body;
      const newDataWithId = {
        ...newData,
        id: parseInt(id+1)
      }
      const document = new myModel(newDataWithId);
      await document.save();

      res.json({
        result: true,
        statusCode: status.CREATED,
      });
    } catch (error) {
      res.json({
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: "Failed to insert data",
      });
    }
}

const getProductFromDB = async (req, res) => {
    try {
      const allData = await myModel.find().exec();

      res.json({
        statusCode: status.OK,
        data: allData,
      });
    } catch (error) {
      res.json({
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: "Failed to get data",
      });
    }
}

const getFlashSaleFromDB = async (req, res) => {
    try {
      const allData = await myModel.find().sort({ createdAt : -1}).exec();

      res.json({
        result:true,
        statusCode: status.OK,
        data: allData,
      });
    } catch (error) {
      res.json({
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: "Failed to get data",
      });
    }
}

const getTrendingProductFromDB = async (req, res) => {
    try {
      const allData = await myModel.find().sort({ rating: -1 }).limit(6).exec();

      res.json({
        result:true,
        statusCode: status.OK,
        data: allData,
      });
    } catch (error) {
      res.json({
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: "Failed to get data",
      });
    }
}

const getTopCategoryIntoDB = async (req, res) => {
    try {
      const allData = await myModel.find().limit(6).exec();

      res.json({
        result:true,
        statusCode: status.OK,
        data: allData,
      });
    } catch (error) {
      res.json({
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: "Failed to get data",
      });
    }
}

const getSingleProductFromDB = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const allData = await myModel.findById(id);

    res.json({
      result: true,
      statusCode: status.OK,
      data: allData,
    });
  } catch (error) {
    res.json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: "Failed to get data",
    });
  }
};

module.exports = {
  productAddIntoDB,
  getProductFromDB,
  getFlashSaleFromDB,
  getTrendingProductFromDB,
  getTopCategoryIntoDB,
  getSingleProductFromDB,
};