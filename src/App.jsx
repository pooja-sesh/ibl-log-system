import {Header} from "./components/Header";
import {EntryForm} from "./features/EntryForm/EntryForm";
import React from "react";
import { Home } from "./pages/Home"
import {useRoutes} from "hookrouter";
import {Log} from "./pages/Log";

const routes = {
    '/': () => <Home />,
    // '/logs/': () => <Log />
    '/logs/:id': ({id}) => <Log id={id}/>
}

// function App() {
//     return (
//         <Home />
//     )
// }

const App = () => {
    const routeResult = useRoutes(routes);

    return routeResult;
}

export default App;