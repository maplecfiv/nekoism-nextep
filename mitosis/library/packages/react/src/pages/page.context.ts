import { createContext } from "react";

export default createContext<any>({
  _page: -1,
  get page() {
    return this._page;
  },
  setPage(page: PAGES) {
    console.debug(`set page to ${page}`);
    this._page = page;
  },
});
