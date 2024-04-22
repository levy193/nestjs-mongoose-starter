module.exports.isNotEmpty = (n) => {
  return (v) => {
    if (!v || v.trim() === '') {
      return `${n} is required`;
    }
    return true;
  };
};
