export const isUnapprovedBuyer = user => {
  return user.canBuy === 'UNAPPROVED';
};

export const isUnapprovedSeller = user => {
  return user.canSell === 'UNAPPROVED';
};

export default { isUnapprovedBuyer, isUnapprovedSeller };
