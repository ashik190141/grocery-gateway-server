const orderModel = require("../order/order.model");
const cartModel = require("../cart/cart.model");
const userModel = require("../auth/auth.model");

function countOrdersByMonthAndYearFormatted(orders) {
  const ordersCount = {};

  orders.forEach((order) => {
    const createdAt = new Date(order.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1; // 1-indexed month
    const monthName = createdAt.toLocaleString("default", { month: "long" }); // Get full month name

    // Create a key like 'April 2024'
    const key = `${month} ${monthName.toLowerCase()} ${year}`;

    // Increment count for this key
    if (!ordersCount[key]) {
      ordersCount[key] = 0;
    }
    ordersCount[key]++;
  });

  // Format the result as an array of objects
  return Object.entries(ordersCount).map(([key, count]) => {
    const [month, monthName, year] = key.split(" ");
    return {
      month: parseInt(month, 10),
      monthName: monthName,
      year: parseInt(year, 10),
      count,
    };
  });
}


const getUserInfo = async (req, res) => {
  try {
    const email = req.params.email;
    const type = req.params.type;
    const query = { email: email };

    let totalCost = 0;
    let totalOrder = 0;
    let totalOrderProduct = 0;
    let noOfPending = 0;
    let noOfDeliver = 0;
    let totalProductOfCart = 0;

    let allOrderOfUser;

    if (type === 'user') {
      allOrderOfUser = await orderModel.find(query).exec();
    } else {
      allOrderOfUser = await orderModel.find().exec();
    }

    totalOrder += allOrderOfUser?.length;
    if (allOrderOfUser) {
      for (let orders of allOrderOfUser) {
        // console.log(order);
        totalCost += orders.totalPrice;
        totalOrderProduct += orders.data.length;
        let orderProduct = orders?.data;
        for (let order of orderProduct) {
          if (order?.status === "pending") noOfPending += 1;
          else noOfDeliver += 1;
        }
      }
    }

    const ordersByMonthAndYear =
      countOrdersByMonthAndYearFormatted(allOrderOfUser);
    
    let allCartData;

    if (type === "user") {
      allCartData = await cartModel.find(query).exec();
    } else {
      allCartData = await cartModel.find().exec();
    }
    
    totalProductOfCart += allCartData?.length;

    const userInfo = await userModel.findOne(query).exec();

    res.json({
      totalCost,
      totalOrder,
      totalOrderProduct,
      noOfDeliver,
      noOfPending,
      totalProductOfCart,
      ordersByMonthAndYear,
      name: userInfo?.name,
      email: email,
    });
  } catch (err) {
    console.log(err)
    res.json({
      message: 'Internal server error'
    })
  }
};


module.exports = {
  getUserInfo,
};