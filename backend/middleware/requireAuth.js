// used to protect the api routes
// used so that only the authroized personal can access the activities

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify the authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  //   ("Bearer asdfagionocjaiosjgasadgsieolsx,.gsdogiuoeislkdjfioohge");
  const token = authorization.split(" ")[1]; // here 1 represent the token

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log("this is error", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
module.exports = requireAuth;

// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const requireAuth = async (req, res, next) => {
//   // verify user is authenticated
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const { _id } = jwt.verify(token, process.env.SECRET);

//     req.user = await User.findOne({ _id }).select("_id");
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Request is not authorized" });
//   }
// };

// module.exports = requireAuth;
