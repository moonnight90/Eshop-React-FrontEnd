import conf from "../config/conf";

class MyBackend {
  BASE = conf.BACKEND_DOMAIN;

  constructor() {}

  async getProducts({
    limit = 20,
    sortby = "title",
    order = "asc",
    page = 1,
    min_price,
    max_price,
    categories = [],
  }) {
    sortby = `${order === "asc" ? "" : "-"}${sortby}`;
    try {
      const response = await fetch(
        `${
          this.BASE
        }/api/products/?limit=${limit}&page=${page}&ordering=${sortby}${
          categories.length ? `&category=${categories.join("&category=")}` : ""
        }${min_price ? `&min_price=${min_price}` : ""}${
          max_price ? `&max_price=${max_price}` : ""
        }`
      );
      return await response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getProduct({ id }) {
    try {
      const resp = await fetch(`${this.BASE}/api/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await resp.json();
    } catch (err) {}
  }

  async addToCart({ product_id, quantity }) {
    try {
      const response = await fetch(`${this.BASE}/api/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage
            .getItem("user_token")
            .replace('"', "")
            .replace('"', "")}`,
        },
        body: JSON.stringify({
          id: product_id,
          q: quantity,
        }),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getCart({ quantity_only }) {
    try {
      const response = await fetch(
        `${this.BASE}/api/cart/${quantity_only ? "?total_quantity=1" : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage
              .getItem("user_token")
              .replace('"', "")
              .replace('"', "")}`,
          },
        }
      );
      return await response.json();
    } catch (err) {}
  }

  async updateCart({ product_id, quantity }) {
    try {
      const response = await fetch(`${this.BASE}/api/cart/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage
            .getItem("user_token")
            .replace('"', "")
            .replace('"', "")}`,
        },
        body: JSON.stringify({
          id: product_id,
          q: quantity,
        }),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteCart(product_id) {
    try {
      const response = await fetch(`${this.BASE}/api/cart/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage
            .getItem("user_token")
            .replace('"', "")
            .replace('"', "")}`,
        },
        body: JSON.stringify({
          id: product_id,
        }),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async sentOTP({ email, name }) {
    try {
      const response = await fetch(`${this.BASE}/api/send_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
      });
      return response;
    } catch (err) {
      return new Object();
    }
  }

  async verifyOTP({ email, otp }) {
    try {
      const resp = await fetch(`${this.BASE}/api/verify_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });
      return resp;
    } catch (err) {
      return new Object();
    }
  }

  async categories() {
    console.log(this.BASE);
    try {
      const resp = await fetch(`${this.BASE}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await resp.json();
    } catch (error) {
      return Object();
    }
  }

  async addressbook(token) {
    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      return await resp.json();
    } catch (error) {
      console.log(error);
      return new Array();
    }
  }

  async addressBookUpdate(token, data) {
    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      return resp;
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }

  async addressBookAdd(token, data) {
    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });
      return resp;
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }

  async addressBookDelete(token, id) {
    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      return resp;
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }

  async placeOrder(token, data) {
    try {
      const resp = await fetch(`${this.BASE}/api/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      return resp;
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }

  async getOrders(token, id = null) {
    try {
      const resp = await fetch(
        `${this.BASE}/api/orders/${id ? `?id=${id}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      return resp;
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  }

  async getOrder(token, id) {
    try {
      const resp = await fetch(`${this.BASE}/api/order/?order_id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return resp;
    } catch (error) {
      return Response(null, { status: 500 });
    }
  }

  async getWishlistItems(token) {
    try {
      const resp = await fetch(`${this.BASE}/api/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return resp;
    } catch (error) {
      return Response(null, { status: 500 });
    }
  }

  async addtoWishlist(token, id) {
    try {
      const resp = await fetch(`${this.BASE}/api/wishlist/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      return resp;
    } catch (error) {
      return Response(null, { status: 500 });
    }
  }

  async deleteWishlistItem(token, id) {
    try {
      const resp = await fetch(`${this.BASE}/api/wishlist/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      return resp;
    } catch (error) {
      return Response(null, { status: 500 });
    }
  }

  async autoComplete(query) {
    try {
      const resp = await fetch(
        `${this.BASE}/api/autocomplete/?query=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resp;
    } catch (error) {
      return Response(null, { status: 500 });
    }
  }
}

const myBackend = new MyBackend();

export default myBackend;
