import './App.css';
import Form from './components/form/form.component';
import { BsGithub } from 'react-icons/bs';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-gradient'>خفیہ پیغام</h1>
        <Form />

        <BsGithub className='GitHub' onClick={()=> window.open("https://github.com/mazanlabeeb", "_blank")} />
      </header>
    </div>
  );
}

export default App;
