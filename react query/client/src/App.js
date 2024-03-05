import { useQuery } from '@tanstack/react-query';
import './App.css';
import { Form } from './components/form';

function App() {

  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch('http://localhost:8000/todo').then((res) =>
        res.json(),
      ),
  });

  console.log(data)
  return (
    <div className="App">
      <Form />
      {
        data && data.data && data.data.map((todo) => <li>{todo.title}</li>)
      }
    </div>
  );
}

export default App;
