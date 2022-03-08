const generateUser = (name, lastName, email, username, password) => {
  const credentials = {
    username,
    password,
  };

  const info = {
    name,
    lastName,
    email,
  };

  const profile = {
    username,
  };

  return {
    credentials,
    info,
    profile,
  };
};

module.exports = generateUser;
