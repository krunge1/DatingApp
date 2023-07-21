import { useState } from "react";

import "./App.css";
import TestPage from "./components/TestPage";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TestPage />
        </>
    );
}

export default App;
