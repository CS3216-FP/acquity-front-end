const getInitials = fullName => {
  const names = fullName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const getCurrentPathWithoutParam = path => {
  // Returns original path given if there no child path.
  return path.slice(0, path.lastIndexOf('/')) || path;
};

const addCommasToNumber = value => {
  return Number(value).toLocaleString('en-SG');
};

export { getInitials, getCurrentPathWithoutParam, addCommasToNumber };
