export const browserRouter = (newPath, render) => {
  history.pushState(null, "", newPath);
  return render();
};

export const hashRouter = (newPath, render) => {
  location.hash = newPath;
  return render();
};

export const router = (newPath, render) => {
  if (newPath.includes("#")) {
    return hashRouter(newPath, render);
  }
  return browserRouter(newPath, render);
};
