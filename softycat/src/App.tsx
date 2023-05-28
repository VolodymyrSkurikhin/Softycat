import OwnerList from "./components/OwnerList";
import { Container } from "./App.styled";

const App:React.FC=()=> {
  return (
    <Container>
      <OwnerList owners={[{id:"1",title: "text"}]}/>
    </Container>
  );
}

export default App;
