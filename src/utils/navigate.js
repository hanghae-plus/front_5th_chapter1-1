/**
 * @param  { string } to
 * @param  { boolean } isReplace
 */
export const navigate = (to, isReplace = false) => {
  const historyChangeEvent = new CustomEvent("historychanged", {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};
