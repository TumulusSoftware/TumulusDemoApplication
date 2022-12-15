export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem("user") as string);

  return { "Authorization": "Bearer " + user.token };
  // if (user && user.token) {
  //   return { Authorization: "Bearer " + user.token };
  // } else {
  //   return {};
  // }
}
