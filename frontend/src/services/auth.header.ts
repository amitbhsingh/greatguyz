export default function authHeader() {
  const userItem = localStorage.getItem('user');

  if (userItem) {
    const user = JSON.parse(userItem);
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    }
  }
  return {};
}
