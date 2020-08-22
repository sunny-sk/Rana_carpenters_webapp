import Url from "../constants/Url";

export const getProductDetails = async (id) => {
  try {
    let result = await fetch(`${Url._getDesignDetails}/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    return result.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
