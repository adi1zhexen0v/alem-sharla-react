import AppRouter from './components/AppRouter';
import './assets/scss/style.scss';

const App = () => {
  console.log(process.env.REACT_APP_VALUE);
  return (
    <div className="app">
      <AppRouter/>
    </div>
  );
}

export default App;
