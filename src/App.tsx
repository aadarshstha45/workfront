import { Container } from "@chakra-ui/react";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Container maxW={"container.lg"}>
      <HomePage />
    </Container>
  );
}

export default App;
