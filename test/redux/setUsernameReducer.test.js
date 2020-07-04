import React from 'react';
import * as actions from "../../src/redux/actions"
import setUsernameReducer from "../../src/redux/setUsernameReducer";

describe("redux setUsernameReducer specification", () => {
    it('returns the initial state when no action has been called', () => {
        expect(setUsernameReducer(undefined, {})).toEqual({
            username: 0
        });
    });

    it('returns state with username value when setUsernameReducer(username) ' +
        'action has been called', () => {
        const username = 'sample username';
        expect(setUsernameReducer([], actions.setUsername(username)))
            .toEqual({username: username});
    });
})