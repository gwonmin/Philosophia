import { UserProvider } from "./context";
import RootPage from "./components/pages/RootPage";

function App() {
  return (
    <UserProvider>
      <RootPage />
    </UserProvider>
  );
}

export default App;
