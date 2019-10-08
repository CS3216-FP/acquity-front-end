const getInitials = fullName => {
  const names = fullName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// eslint-disable-next-line import/prefer-default-export
export { getInitials };
