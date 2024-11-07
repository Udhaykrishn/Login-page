export const users = [{ username: "admin", password: "password" },{username:"uday",password:"helloworld"}];

export const findUsers = ({ username, password }) => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  return user;
};
