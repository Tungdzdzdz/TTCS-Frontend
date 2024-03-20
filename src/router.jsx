import { Route, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import App from "./components/App";
import Home from "./components/home/Home";
import ResultContainer from "./components/result/ResultContainer";
import FixtureContainer from "./components/fixture/FixtureContainer";
import TableContainer from "./components/table/TableContainer";
import PlayerContainer from "./components/player/PlayerContainer";
import ClubContainer from "./components/club/ClubContainer";
import CoachContainer from "./components/coach/CoachContainer";
import StatContainer from "./components/stat/StatContainer";

const router = createBrowserRouter(
    createRoutesFromChildren([
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}></Route>
            <Route path="auth">
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
            <Route path="result" element={<ResultContainer/>}></Route>
            <Route path="fixture" element={<FixtureContainer/>}></Route>
            <Route path="table" element={<TableContainer/>}></Route>
            <Route path="player" element={<PlayerContainer/>}></Route>
            <Route path="club" element={<ClubContainer/>}></Route>
            <Route path="coach" element={<CoachContainer/>}></Route>
            <Route path="stat" element={<StatContainer/>}></Route>
        </Route>
    ])
)

export default router;