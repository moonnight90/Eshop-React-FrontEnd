class API {
  BASE;
  constructor() {
    self.BASE = "https://dummyjson.com/";
  }

  getProducts = async ({
    limit = 10,
    skip = 0,
    sortby = "title",
    order = "asc",
  }) => {
    const res = await fetch(
      `${self.BASE}products?limit=${limit}&skip=${skip}&sortBy=${sortby}&order=${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  };

  getProduct = async (id) => {
    const res = await fetch(`${self.BASE}products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  getCategories = async () => {
    const res = await fetch(`${self.BASE}products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };
  getUserCart = async (id) => {
    const res = await fetch(`${self.BASE}carts/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };
}

const api = new API();

export default api;
