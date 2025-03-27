let isHash = !!location.hash;

const hashState = {
  setHashState: (state) =>
    (isHash = typeof state === "boolean" ? state : isHash),

  getHashState: () => isHash,
};

export default hashState;
