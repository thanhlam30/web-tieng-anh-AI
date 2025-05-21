const auth = {
  logout: (cb) => {
    localStorage.removeItem("token");
    cb();
  },
};

export default auth;
