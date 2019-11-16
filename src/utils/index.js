import { fromUnixTime } from 'date-fns';

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

const getTimeFromTimestamp = timestamp => {
  return fromUnixTime(timestamp).toLocaleTimeString([], {
    timeStyle: 'short'
  });
};

// https://dev.to/goenning/how-to-retry-when-react-lazy-fails-mb5
const retryPromise = (promise, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    promise()
      .then(resolve)
      .catch(error => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retryPromise(promise, retriesLeft - 1, interval).then(
            resolve,
            reject
          );
        }, interval);
      });
  });
};

export {
  getInitials,
  getCurrentPathWithoutParam,
  getTimeFromTimestamp,
  addCommasToNumber,
  retryPromise
};
