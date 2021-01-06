import React from 'react';
import './css/App.css';
import { observer } from 'mobx-react-lite';
import { useStore } from './StoreContext';

const App = observer(() => {
    const rootStore = useStore();

    const onAddClick = () => {
        rootStore.dataStore.addData(prompt('data name:'));
    }
    const onChangeClick = () => {
        rootStore.uiStore.changeTheme(prompt('theme color:'));
    }

    return (
        <div className='App'>
            {rootStore.dataStore.report}
            <br/>
            {rootStore.uiStore.report}
            <ul>
                {rootStore.dataStore.dataList.map(
                    (data, i) => <AppView data={data} key={i} rootStore={rootStore.dataStore} />
                )}
            </ul>
            <button onClick={onAddClick}>add data</button>
            <small> (double-click a data item to edit)</small>
            <br />
            <button onClick={onChangeClick}>change theme color</button>
        </div>
    );
})

const AppView = observer(({ data, rootStore }) => {
    const onToggleCompleted = () => {
        rootStore.toggleCompleted(data);
    }

    const onRename = () => {
        const name = prompt('data name', data.name) || data.name;
        rootStore.renameData(data.name, name);
    }

    return (
        <li onDoubleClick={onRename}>
            <input
                type='checkbox'
                checked={data.completed}
                onChange={onToggleCompleted}
            />
            {data.name}
        </li>
    );
});

export default App;