import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import Router1 from './components/router';
import { Provider } from 'react-redux';
import store from './components/store/store'


function App() {

  const [show, setShow] = useState(false)
  return (
    <Provider store={store}>
      <Router1 />
    </Provider>
  );
}

export default App;
