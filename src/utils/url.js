const baseUrl = "front_5th_chapter1-1";

const addBaseUrl = (url) => {
  if (url.includes(baseUrl)) {
    return url;
  }

  const cleanPath = url.replace(/^\//, "");

  return `/${baseUrl}/${cleanPath}`;
};

const removeBaseUrl = (url) => {
  if (!url.includes(baseUrl)) {
    return url;
  }

  const cleanPath = url.replace(/^\//, "");

  return cleanPath.substring(baseUrl.length);
};

export { addBaseUrl, removeBaseUrl };
