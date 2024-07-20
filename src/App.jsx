import Todo from "./component/Todo";
import StopWatch from "./component/StopWatch";

function App() {

  return (
    <>
      <div className="bg-gray-100">
        <StopWatch />
        <Todo />
      </div>
    </>
  );
}

export default App;
