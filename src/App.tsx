import './App.css';

import Header from './components/Header';
import Content from './components/Content';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Content />
      </div>
    </Provider>
  );
}

export default App;
