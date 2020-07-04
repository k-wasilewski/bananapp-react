import GetDays from "../../src/func/GetDays";

describe("GetDays functional specification", () => {
    it('GetDays() maps number of days to day count', () => {
        expect(GetDays(1.0)).toBe('1 day');
        expect(GetDays(2.0)).toBe('2 days');
        expect(GetDays(3.0)).toBe('3 days');
        expect(GetDays(4.0)).toBe('4 days');
        expect(GetDays(5.0)).toBe('5 days');
        expect(GetDays(6.0)).toBe('6 days');
        expect(GetDays(7.0)).toBe('7 days');
    });
});