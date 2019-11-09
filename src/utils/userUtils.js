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

export const isCommittee = user => {
  return user.isCommittee;
};

export const getUserPrice = ({ userType, sellerPrice, buyerPrice }) => {
  return userType === 'seller' ? sellerPrice : buyerPrice;
};

export const getUserNumberOfShares = ({
  userType,
  sellerNumberOfShares,
  buyerNumberOfShares
}) => {
  return userType === 'seller' ? sellerNumberOfShares : buyerNumberOfShares;
};

export const getOtherPartyUserType = ({ userType }) => {
  return userType === 'seller' ? 'buyer' : userType;
};

export default {
  isUnapprovedBuyer,
  isUnapprovedSeller,
  isBuyer,
  isSeller,
  isCommittee,
  getUserPrice,
  getUserNumberOfShares,
  getOtherPartyUserType
};
