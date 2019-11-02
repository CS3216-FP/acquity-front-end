export const isUnapprovedBuyer = user => {
  return user.canBuy === 'UNAPPROVED';
};

export const isBuyer = user => {
  return user.canBuy === 'UNAPPROVED' || user.canBuy === 'YES';
};

export const isUnapprovedSeller = user => {
  return user.canSell === 'UNAPPROVED';
};

export const isSeller = user => {
  return user.canSell === 'UNAPPROVED' || user.canSell === 'YES';
};

export const isAdmin = user => {
  return user.isAdmin;
};

export default {
  isUnapprovedBuyer,
  isUnapprovedSeller,
  isBuyer,
  isSeller,
  isAdmin
};
