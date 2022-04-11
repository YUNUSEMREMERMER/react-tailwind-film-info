
import './App.css';
import BottomBar from './components/BottomBar';
import Content from './components/Content';
import Header from './components/Header';

function App() {
  return (
    <div className='app'>
      <Header/>
      <Content />
      <BottomBar/>
    </div>
    
  );
}

export default App;
