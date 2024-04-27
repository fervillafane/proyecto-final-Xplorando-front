import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/* This function register a new user */
export async function registerUser(registro) {
  try {
    const response = await api.post("/auth/register-user", registro);
    return response.data;
  } catch (error) {
    if (error.reeponse && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error en el registro de usuario : ${error.message}`);
    }
  }
}

/* This function login a registered user */
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* This is the function to get a single user */
export async function getUser(email, token) {
  console.log("Calling getUser");
  try {
    const response = await api.get(`/users/${email}`, {
      headers: getHeader(),
    });
    // Print the API response to the console
    console.log("Aaaaaaaaaaa");
    console.log(response.data);
    // Check if firstName and lastName exist in the response
    if (response.data.firstName && response.data.lastName) {
      console.log("Por favor salga algo");
      // Store the first name and last name in local storage
      sessionStorage.setItem("firstName", response.data.firstName);
      sessionStorage.setItem("lastName", response.data.lastName);
    } else {
      console.log(
        "firstName and lastName are not included in the API response"
      );
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

/*  This is function to get the user profile */
export async function getUserProfile(email, token) {
  // Add this line
  try {
    const response = await api.get(`users/profile/${email}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
