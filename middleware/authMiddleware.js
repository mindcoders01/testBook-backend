// auth middleware (role)
// v1 unprotected
// v2 protected
// v3 adminprotected
// v4 SuperAdminprotected
const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");
const { verifyJwtToken } = require("../config/jwtToken");

// const isLoggedIn = async(req,res,next)=>{
//     try{
//         console.log("run")
//         const {token} = req?.cookies
//         let decoded = await verifyJwtToken(token)
//         if(decoded.user.role!=="admin"){
//             return res.send("admin protected")
//         }
//         console.log("decoded",decoded)
//         console.log("token",token)
//         req.user = decoded
//         next()

//     }catch(error){
//         console.log("errror in catch")
//         res.status(401).json(new ApiResponse(false,null,"unauthorized: endpoint protected"))

//     }
// }

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.token;
    console.log("aa==>",accessToken);
    
    
    if (!accessToken)
      return res
    .status(404)
    .json(new ApiResponse(false, null, "User not login,Token not found"));
    const decodedUser = await verifyJwtToken(accessToken);
    console.log(decodedUser);
    if (!decodedUser) {
      return res.json(new ApiResponse(false, null, "invalid token"));
    }

    req.decodedUser = decodedUser;

    next();
  } catch (error) {
    console.log("Error in isLoggedIn middleware:", error);
    res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.token;
    if (!accessToken)
      return res
        .status(404)
        .json(new ApiResponse(false, null, "User not login,Token not found"));
    const decodedUser = await verifyJwtToken(accessToken);

    if (!decodedUser) {
      return res.json(new ApiResponse(false, null, "invalid token"));
    }

    if (decodedUser.role !== "admin")
      return res
        .status(403)
        .json(
          new ApiResponse(false, null, "Access denied. Admin role requied")
        );
    req.decodedUser = decodedUser;
    next();
  } catch (error) {
    res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

module.exports = { isLoggedIn, isAdmin };
