class Auth {
  constructor() {}
  login = async (data) => {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();

  };

  signup = async (data) => {
    const res = await fetch("https://dummyjson.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data2 = await res.json();
    return data2;
  };

  me = async () => {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  logout = async () => {
    const res = await fetch("https://dummyjson.com/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };
}

const auth = new Auth();

export default auth;
