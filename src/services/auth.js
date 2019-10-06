const checkToken = token => {
  if (token) {
    return fetch(`${process.env.REACT_APP_BACKEND_API}auth/seller/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }
  return Promise.resolve();
};

export default { checkToken };
