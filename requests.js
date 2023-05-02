const BASE_URL = "https://app.dukaapp.com/api/v1";

export const registerUser = (data) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const loginUser = (data) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const getUsers = (token) => {
  return fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getPages = (token) => {
  return fetch(`${BASE_URL}/pages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const getOrders = (token) => {
  return fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const getDetails = (slug) => {
  return fetch(`${BASE_URL}/pages/show/${slug}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const postProducts = (token, data) => {
  return fetch(`${BASE_URL}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const updateUser = (token, data) => {
  return fetch(`${BASE_URL}/update-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const deletePage = (token, id) => {
  return fetch(`${BASE_URL}/pages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const searchPage = (query) => {
  return fetch(`${BASE_URL}/pages/search/${query}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const paySuccess = (id) => {
  return fetch(`${BASE_URL}/order/paid/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const withdraw = (token) => {
  return fetch(`${BASE_URL}/withdraw`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const updatePage = (token, id, data) => {
  return fetch(`${BASE_URL}/pages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const resetPassword = (data) => {
  return fetch(`${BASE_URL}/reset/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const verifyPassword = (data) => {
  return fetch(`${BASE_URL}/verify/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
export const checkoutHandle = (data) => {
  return fetch(`${BASE_URL}/mpesa/stk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
