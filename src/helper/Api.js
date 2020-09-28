import Url from "../constants/Url";

export const _setLocalStorage = (key, value) => {
  if (Window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
};

export const authenticate = (response, next) => {
  _setLocalStorage("user", response);
  next();
};
export const signOut = (next) => {
  localStorage.removeItem("user");
  next();
};

//check whether user is authenticate or not
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

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

export const loginAdmin = async (data) => {
  try {
    let result = await fetch(`${Url._login}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return result.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDetails = async () => {
  try {
    let result = await fetch(`${Url._getDetails}`, {
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
export const updateDetails = async (data, id) => {
  try {
    const token = isAuthenticated().token;
    let result = await fetch(`${Url._getDetails}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ ...data }),
    });
    return result.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllCategories = async () => {
  try {
    let result = await fetch(Url._getAllCategories, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("server error");
  }
};
