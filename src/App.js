import { Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Add from "./components/Add";
import List from "./components/List";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

function App() {
    return (
	<Routes>
	    <Route path="/" element={<Home />} />
	    <Route path="/register" element={<Register />} />
	    <Route path="/login" element={<LogIn />} />
	    <Route path="/add" element={<Add />} />
	    <Route path="/list" element={<List />} />
	    <Route path="/edit/:id" element={<Edit />} />
	    <Route path="/delete/:id" element={<Delete />} />
	</Routes>
    );
}

export default App;
