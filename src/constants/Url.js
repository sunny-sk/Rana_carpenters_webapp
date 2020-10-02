// const BASE_URL = "https://ranacarpenters.herokuapp.com";
const BASE_URL = "http://localhost:4100";

export default {
  _noImageUrl:
    "https://res.cloudinary.com/smarty123/image/upload/v1601652634/Products/no-image-1_l3ck9m.jpg",
  _imageBase:
    "https://res.cloudinary.com/smarty123/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/g_center,l_waterMark1/",
  _getDesignDetails: BASE_URL + "/api/v1/products",
  _getAllDesigns: BASE_URL + "/api/v1/products",
  _login: BASE_URL + "/api/v1/auth/login",
  _getDetails: BASE_URL + "/api/v1/details",
  _getAllCategories: BASE_URL + "/api/v1/category",
  _getAllProducts: BASE_URL + "/api/v1/products",
  _getAllInventories: BASE_URL + "/api/v1/inventory",
  _createCategory: BASE_URL + "/api/v1/category",
  _deleteCategory: BASE_URL + "/api/v1/category",
};
