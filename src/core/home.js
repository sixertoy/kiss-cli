const homeuser = () => {
  const { HOME, USERPROFILE } = process.env;
  return HOME || USERPROFILE;
};

module.exports = homeuser;
