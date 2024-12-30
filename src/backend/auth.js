import conf from "../config/conf";
class Auth {
  BaseURL;
  constructor() {
    self.BaseURL = conf.BACKEND_DOMAIN;
  }

  login = async (data) => {
    try {
      const resp = await fetch(`${self.BaseURL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      return await resp.json();
    } catch (err) {
      return err;
    }
  };

  signup = async (data) => {
    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }
    const resp = await fetch(`${self.BaseURL}/api/register/`, {
      method: "POST",
      headers: {},
      body: formData,
    });
    return resp;
  };

  me = async (token) => {
    const resp = await fetch(`${self.BaseURL}/api/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return resp;
  };

  send_otp = async (data) => {
    try {
      const resp = await fetch(`${self.BaseURL}/api/send_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await resp.json();
    } catch (err) {
      return err;
    }
  };

  verify_otp = async (data) => {
    try {
      const resp = await fetch(`${self.BaseURL}/api/verify_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await resp.json();
    } catch (err) {
      return err;
    }
  };

  update_user = async (token, data) => {
    try {
      const form = new FormData();
      data?.first_name && form.append("first_name", data?.first_name);
      data?.last_name && form.append("last_name", data?.last_name);
      data?.bio && form.append("bio", data?.bio);
      if (data?.file?.[0]) {
        form.append("image", data?.file?.[0]);
      }
      const resp = await fetch(`${self.BaseURL}/api/me/`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: form,
      });

      return resp;
    } catch (error) {
      return { message: "Failed" };
    }
  };

  update_password = async (token, current_password, new_password) => {
    try {
      const resp = await fetch(`${self.BaseURL}/api/update-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          current_password,
          new_password,
        }),
      });

      return resp;
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  };
}

const backendAuth = new Auth();
export default backendAuth;
