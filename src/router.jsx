import {Route, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
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
import AdminLogin from "./components/auth/AdminLogin";
import AdminUser from "./components/admin/AdminUser";
import AdminPlayer from "./components/admin/AdminPlayer";
import AdminCoach from "./components/admin/AdminCoach";
import AdminClub from "./components/admin/AdminClub";
import AdminFixture from "./components/admin/AdminFixture";
import AdminSeason from "./components/admin/AdminSeason";
import ManageSeason from "./components/admin/ManageSeason";
import ManageFixture from "./components/admin/ManageFixture";
import AdminResult from "./components/admin/AdminResult";
import ManageResult from "./components/admin/ManageResult";
import CoachDetail from "./components/coach/CoachDetail";
import NotFound from "./components/NotFound";

const router = createBrowserRouter(
    createRoutesFromChildren([
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}></Route>
            <Route path="auth">
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="login/admin" element={<AdminLogin/>}/>
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
            <Route path="coach">
                <Route index element={<CoachContainer/>}/>
                <Route path=":coachId" element={<CoachDetail/>}/>
            </Route>
            <Route path="stat" element={<StatContainer/>}>
                <Route index element={<PlayerStatContainer/>}/>
                <Route path="player-stat" element={<PlayerStatContainer/>}></Route>
                <Route path="club-stat" element={<ClubStatContainer/>}></Route>
                <Route path="head-to-head" element={<HeadToHeadContainer/>}></Route>
                <Route path="player-comparison" element={<PlayerComparisonContainer/>}></Route>
            </Route>
            <Route path="admin">
                <Route path="user" index element={<AdminUser/>}/>
                <Route path="player" element={<AdminPlayer/>}/>
                <Route path="coach" element={<AdminCoach/>}/>
                <Route path="club" element={<AdminClub/>}/>
                <Route path="fixture">
                    <Route index element={<AdminFixture/>}/>
                    <Route path=":matchId" element={<ManageFixture/>}/>
                </Route>
                <Route path="season">
                    <Route index element={<AdminSeason/>}/>
                    <Route path=":seasonId" element={<ManageSeason/>}/>
                </Route>
                <Route path="result">
                    <Route index element={<AdminResult/>}/>
                    <Route path=":resultId" element={<ManageResult/>}/>
                </Route>
            </Route>
        </Route>,
        <Route path="*" element={<NotFound/>}></Route>
    ])
)

export default router;