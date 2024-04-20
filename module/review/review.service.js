const status = require("http-status");
const myModel = require("./review.model");
const authModel = require("../auth/auth.model");

const reviewAddIntoDB = async (req, res) => {
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

const getReviewFromDB = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { id : id };
    const allData = await myModel.find(query).exec();
    
    let result = [];
    for (let i = 0; i < allData.length; i++){
        let email = allData[i].email;
        const userInfo = await authModel.findOne({ email });
        result.push({
          review: allData[i].review,
          rating: allData[i].rating,
          name: userInfo.name,
        });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: "Failed to get data",
    });
  }
};

module.exports = {
  reviewAddIntoDB,
  getReviewFromDB
};
