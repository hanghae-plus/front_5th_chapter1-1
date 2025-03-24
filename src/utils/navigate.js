/**
 * @param  { string } to
 * @param  { boolean } isReplace
 */
export const browserNavigate = (to, isReplace = false) => {
  const historyChangeEvent = new CustomEvent("historychanged", {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};
