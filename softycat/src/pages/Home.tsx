// import { Container } from "../components/cards/Container.styled";
import { OwnerList, Container } from "../components/cards";
import list from "../Service/list.json";

// interface IItem {
//   id: string;
//   url?: string;
//   title: string;
// }

// interface IProps {
//   owners: IItem[];
// }

export const Home: React.FC = () => {
  return (<Container>
    <OwnerList owners={list} />
  </Container>)
}
