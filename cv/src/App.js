import { RouterProvider } from "react-router-dom";
import { router } from "./common/Router";
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;