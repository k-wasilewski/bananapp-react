import { DataStore } from '../stores/DataStore';
import { UiStore } from '../stores/UiStore';

export class RootStore {
	dataStore;
	uiStore;

	constructor() {
		this.dataStore = new DataStore();
		this.uiStore = new UiStore();
	}
}