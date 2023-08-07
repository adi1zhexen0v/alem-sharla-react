import './assets/scss/style.scss';
import AppRouter from './components/AppRouter';

const App = () => {
  console.log(AppRouter);
  return (
    <div className="app">
      <AppRouter/>
    </div>
  );
}

export default App;
