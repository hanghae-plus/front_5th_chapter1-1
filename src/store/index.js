import { setLocalItem } from "../utils";

import { initialState, reducer } from "./store";
import createStore from "./createStore";
import middleware from "./middleware";

const Store = createStore(reducer, initialState, middleware);

Store.subscribe((state) => {
  console.log("상태가 변경되었습니다:", state);

  if (state.user) {
    setLocalItem("user", state.user);
  }
});

export default Store;
