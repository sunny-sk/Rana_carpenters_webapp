// const BASE_URL = "http://3.16.150.241";
const BASE_URL = "https://ranacarpenters.herokuapp.com";

export default {
  _imageBase:
    "https://res.cloudinary.com/smarty123/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/",
  _getDesignDetails: BASE_URL + "/api/v1/products",
  _getAllDesigns: BASE_URL + "/api/v1/products",
  _login: BASE_URL + "/api/v1/auth/login",
  _getDetails: BASE_URL + "/api/v1/details",
  _getAllCategories: BASE_URL + "/api/v1/category",
  _getAllProducts: BASE_URL + "/api/v1/products",
  _getAllInventories: BASE_URL + "/api/v1/inventory",
};
