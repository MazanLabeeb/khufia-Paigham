import './App.css';
import Form from './components/form/form.component';
import Social from './components/social/social.component';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-gradient'>خفیہ پیغام</h1>
        <Form />

        <Social />
      </header>
    </div>
  );
}

export default App;
