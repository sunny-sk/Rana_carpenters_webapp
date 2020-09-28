// const BASE_URL = "http://3.16.150.241";
const BASE_URL = "https://ranacarpenters.herokuapp.com";

export default {
  _getDesignDetails: BASE_URL + "/api/v1/products",
  _getAllDesigns: BASE_URL + "/api/v1/products",
  _login: BASE_URL + "/api/v1/auth/login",
  _getDetails: BASE_URL + "/api/v1/details",
  _getAllCategories: BASE_URL + "/api/v1/category",
};
