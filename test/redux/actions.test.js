import React from 'react';
import * as actions from "../../src/redux/actions"

describe("redux actions specification", () => {
    it('setUsername action works as expected', () => {
        const result = ['sample result'];
        const expectedAction = {
            type: actions.SET_USERNAME,
            data: result
        };
        expect(actions.setUsername(result)).toEqual(expectedAction);
    });
});