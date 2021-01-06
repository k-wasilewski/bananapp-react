import { makeObservable, observable, computed, action, autorun } from 'mobx';

export class DataStore {
    dataList = [];

    constructor() {
        makeObservable(this, {
            dataList: observable,
            completedDataCount: computed,
            report: computed,
            addData: action,
            toggleCompleted: action,
            renameData: action
        });
        autorun(() => console.log(this.report));
    }

    get completedDataCount() {
        return this.dataList.filter(
            data => data.completed === true
        ).length;
    }

    get report() {
        if (this.dataList.length === 0)
            return "[empty]";
        const next = this.dataList.find(d => d.completed === false);
        return `next data: "${next ? next.name : "[empty]"}". ` +
            `${this.completedDataCount}/${this.dataList.length}`;
    }

    addData(name) {
        this.dataList.push({
            name: name,
            completed: false
        });
    }

    toggleCompleted(d) {
        d.completed = !d.completed;
    }

    renameData(old, n) {
        const d = this.dataList.find(d => d.name === old);
        d.name = n;
    }
}