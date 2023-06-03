import OwnerList from "./components/OwnerList";
import { Container } from "./App.styled";
import list from "./Service/list.json";

const App: React.FC = () => {
  return (
    <Container>
      <OwnerList owners={list} />
    </Container>
  );
}

export default App;
