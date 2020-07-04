import React from 'react';
import rootReducer from "../../src/redux/rootReducer";
import { createStore } from 'redux';

describe("redux rootReducer specification", () => {
    it('combines all the reducers', () => {
        const store = createStore(rootReducer);

        expect(store.getState().setUsernameReducer).toHaveProperty('username');
    });
});