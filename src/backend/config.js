import conf from "../config/conf";

class MyBackend {
  BASE = conf.BACKEND_DOMAIN;

  constructor() {}

  getToken(providedToken = null) {
    if (providedToken) {
      return providedToken;
    }

    const rawToken = localStorage.getItem("user_token");
    if (!rawToken) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawToken);
      return typeof parsed === "string" ? parsed : null;
    } catch (_error) {
      return rawToken;
    }
  }

  authHeaders(token = null, withJson = true) {
    const resolvedToken = this.getToken(token);
    if (!resolvedToken) {
      return null;
    }

    const headers = {
      Authorization: `Token ${resolvedToken}`,
    };

    if (withJson) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  async getProducts({
    limit = 20,
    sortby = "title",
    order = "asc",
    page = 1,
    min_price,
    max_price,
    categories = [],
    q = null,
  }) {
    const params = [];
    const ordering = `${order === "asc" ? "" : "-"}${sortby}`;

    if (limit) params.push(`limit=${limit}`);
    if (page) params.push(`page=${page}`);
    if (ordering) params.push(`ordering=${ordering}`);
    if (categories.length) {
      params.push(
        `category=${categories.map((cat) => encodeURIComponent(cat)).join("&category=")}`
      );
    }
    if (min_price) params.push(`min_price=${min_price}`);
    if (max_price) params.push(`max_price=${max_price}`);
    if (q) params.push(`search=${encodeURIComponent(q)}`);

    try {
      const response = await fetch(
        `${this.BASE}/api/products/${params.length ? `?${params.join("&")}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
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
    } catch (_err) {
      return {};
    }
  }

  async addToCart({ product_id, quantity }) {
    const headers = this.authHeaders();
    if (!headers) {
      return { status: 401, error: "Authentication required." };
    }

    try {
      const response = await fetch(`${this.BASE}/api/cart/`, {
        method: "POST",
        headers,
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
    const headers = this.authHeaders();
    if (!headers) {
      return quantity_only ? { total_quantity: 0 } : [];
    }

    try {
      const response = await fetch(
        `${this.BASE}/api/cart/${quantity_only ? "?total_quantity=1" : ""}`,
        {
          method: "GET",
          headers,
        }
      );
      return await response.json();
    } catch (_err) {
      return quantity_only ? { total_quantity: 0 } : [];
    }
  }

  async updateCart({ product_id, quantity }) {
    const headers = this.authHeaders();
    if (!headers) {
      return { status: 401, error: "Authentication required." };
    }

    try {
      const response = await fetch(`${this.BASE}/api/cart/`, {
        method: "PUT",
        headers,
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
    const headers = this.authHeaders();
    if (!headers) {
      return { status: 401, error: "Authentication required." };
    }

    try {
      const response = await fetch(`${this.BASE}/api/cart/`, {
        method: "DELETE",
        headers,
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
          email,
          name,
        }),
      });
      return response;
    } catch (_err) {
      return new Response(null, { status: 500 });
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
          email,
          otp,
        }),
      });
      return resp;
    } catch (_err) {
      return new Response(null, { status: 500 });
    }
  }

  async categories() {
    try {
      const resp = await fetch(`${this.BASE}/api/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await resp.json();
    } catch (_error) {
      return [];
    }
  }

  async addressbook(token) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return [];
    }

    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "GET",
        headers,
      });

      return await resp.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addressBookUpdate(token, data) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async addressBookAdd(token, data) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async addressBookDelete(token, id) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/addressbook/`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id }),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async placeOrder(token, data) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/orders/`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async createStripeCheckoutSession(token, data) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/payments/create-checkout-session/`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async getStripeSessionStatus(token, sessionId) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(
        `${this.BASE}/api/payments/session-status/?session_id=${encodeURIComponent(sessionId)}`,
        {
          method: "GET",
          headers,
        }
      );
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async getOrders(token, id = null) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(
        `${this.BASE}/api/orders/${id ? `?id=${id}` : ""}`,
        {
          method: "GET",
          headers,
        }
      );
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async getOrder(token, id) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/order/?order_id=${id}`, {
        method: "GET",
        headers,
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async getWishlistItems(token) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/wishlist/`, {
        method: "GET",
        headers,
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async addtoWishlist(token, id) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/wishlist/`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ id }),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async deleteWishlistItem(token, id) {
    const headers = this.authHeaders(token);
    if (!headers) {
      return new Response(null, { status: 401 });
    }

    try {
      const resp = await fetch(`${this.BASE}/api/wishlist/`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id }),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async autoComplete(query, controleSignal) {
    try {
      const resp = await fetch(
        `${this.BASE}/api/autocomplete/?query=${encodeURIComponent(query)}`,
        {
          signal: controleSignal,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async reset_password(email) {
    try {
      const resp = await fetch(`${this.BASE}/api/reset_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }

  async confirm_reset_password(email, otp, password) {
    try {
      const resp = await fetch(`${this.BASE}/api/reset_password_confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          new_password: password,
        }),
      });
      return resp;
    } catch (_error) {
      return new Response(null, { status: 500 });
    }
  }
}

const myBackend = new MyBackend();

export default myBackend;
