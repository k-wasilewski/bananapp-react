import { makeObservable, observable, computed, action, autorun } from 'mobx';

export class UiStore {
    themeColor = 'darkblue';

    constructor() {
        makeObservable(this, {
            themeColor: observable,
            report: computed,
            changeTheme: action
        });
        autorun(() => console.log(this.report));
    }

    get report() {
        return `color theme: ${this.themeColor}`;
    }

    changeTheme(themeColor) {
        this.themeColor = themeColor;
    }
}