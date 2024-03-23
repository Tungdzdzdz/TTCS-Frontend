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
import PlayerStatContainer from "./components/stat/PlayerStatContainer";
import ClubStatContainer from "./components/stat/ClubStatContainer";
import HeadToHeadContainer from "./components/stat/HeadToHeadContainer";
import PlayerComparisonContainer from "./components/stat/PlayerComparisonContainer";
import ClubDetailContainer from "./components/club/ClubDetailContainer";
import PlayerDetailContainer from "./components/player/PlayerDetailContainer";
import MatchDetail from "./components/match/MatchDetail";

const router = createBrowserRouter(
    createRoutesFromChildren([
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}></Route>
            <Route path="auth">
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
            <Route path="result">
                <Route index element={<ResultContainer/>}></Route>
                <Route path=":resultId" element={<MatchDetail/>}></Route>
            </Route>
            <Route path="fixture" element={<FixtureContainer/>}></Route>
            <Route path="table" element={<TableContainer/>}></Route>
            <Route path="player">
                <Route index element={<PlayerContainer/>}></Route>
                <Route path=":playerId" element={<PlayerDetailContainer/>}></Route>
            </Route>
            <Route path="club">
                <Route index element={<ClubContainer/>}/>
                <Route path=":clubId" element={<ClubDetailContainer/>}/>
            </Route>
            <Route path="coach" element={<CoachContainer/>}></Route>
            <Route path="stat" element={<StatContainer/>}>
                <Route index element={<PlayerStatContainer/>}/>
                <Route path="player-stat" element={<PlayerStatContainer/>}></Route>
                <Route path="club-stat" element={<ClubStatContainer/>}></Route>
                <Route path="head-to-head" element={<HeadToHeadContainer/>}></Route>
                <Route path="player-comparison" element={<PlayerComparisonContainer/>}></Route>
            </Route>
        </Route>
    ])
)

export default router;