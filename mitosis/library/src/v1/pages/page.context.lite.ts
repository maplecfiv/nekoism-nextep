import { createContext } from '@builder.io/mitosis';

import { PAGES } from '../service/PageService';

export default createContext({

    _page: -1,
    get page(): PAGES {
        return this._page;
    },
    setPage(page: PAGES) {
        console.debug(`set page to ${page}`)
        this._page = page;
    },
});
