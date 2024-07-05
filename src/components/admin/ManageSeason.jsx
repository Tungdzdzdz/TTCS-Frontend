import { useLocation, useNavigate, useParams } from "react-router-dom";
import FuncContainer from "../hcom/FuncContainer";
import { useEffect, useReducer, useState } from "react";
import InputComponent from "../hcom/InputComponent";
import SelectClub from "./SelectClub";
import EditButton from "../hcom/EditButton";
import AddButton from "../hcom/AddButton";
import { toast } from "react-toastify";
import Loader from "../hcom/Loader";
import { useAppContext } from "../AppContext";

const CHANGE_SEASON_NAME = "CHANGE_SEASON_NAME";
const CHANGE_START_SEASON = "CHANGE_START_SEASON";
const CHANGE_END_SEASON = "CHANGE_END_SEASON";
const CHANGE_SPONSOR = "CHANGE_SPONSOR";
const CHANGE_QUANITY = "CHANGE_QUANITY";
const ADD_CLUB = "ADD_CLUB";
const REMOVE_CLUB = "REMOVE_CLUB";
const ADD_PLAYER = "ADD_PLAYER";
const REMOVE_PLAYER = "REMOVE_PLAYER";
const CHANGE_POSITION = "CHANGE_POSITION";
const ADD_COACH = "ADD_COACH";
const CHANGE_NUMBERJERSEY = "CHANGE_NUMBERJERSEY";

const reducer = (preState, action) => {
    switch (action.type) {
        case CHANGE_SEASON_NAME:
            return { ...preState, name: action.value };
        case CHANGE_START_SEASON:
            return { ...preState, startSeason: action.value };
        case CHANGE_END_SEASON:
            return { ...preState, endSeason: action.value };
        case CHANGE_SPONSOR:
            return { ...preState, sponsor: action.value };
        case CHANGE_QUANITY:
            return { ...preState, quanity: action.value, clubs: preState.clubs.slice(0, action.value)};
        case ADD_CLUB:
            return { ...preState, clubs: [...preState.clubs, { players: [], club: action.value, positions: [], numberJersey: [] }] };
        case REMOVE_CLUB:
            return { ...preState, clubs: preState.clubs.toSpliced(action.value, 1) };
        case ADD_PLAYER:
            return {
                ...preState,
                clubs: preState.clubs.map((e, i) => {
                    if (i === action.index) {
                        return { ...e, players: [...e.players, action.valuePlayer], positions: [...e.positions, action.valuePosition], numberJersey: [...e.numberJersey, 0]};
                    }
                    return e;
                })
            }
        case REMOVE_PLAYER:
            return {
                ...preState,
                clubs: preState.clubs.map((e, i) => {
                    if (i === action.index) {
                        return { ...e, players: e.players.toSpliced(action.value, 1), positions: e.positions.toSpliced(action.value, 1), numberJersey: e.numberJersey.toSpliced(action.value, 1) };
                    }
                    return e;
                })
            }
        case CHANGE_POSITION:
            return {
                ...preState,
                clubs: preState.clubs.map((e, i) => {
                    if (i === action.index) {
                        return {
                            ...e, positions: e.positions.map((p, j) => {
                                if (j === action.playerIndex) {
                                    return action.value;
                                }
                                return p;
                            })
                        }
                    }
                    return e;
                })
            }
        case ADD_COACH:
            return {
                ...preState,
                clubs: preState.clubs.map((e, i) => {
                    if (i === action.index) {
                        return { ...e, coach: action.value };
                    }
                    return e;
                })
            }
        case CHANGE_NUMBERJERSEY:
            return {
                ...preState,
                clubs: preState.clubs.map((e, i) => {
                    if (i === action.index) {
                        return {
                            ...e, numberJersey: e.numberJersey.map((p, j) => {
                                if (j === action.playerIndex) {
                                    return action.value;
                                }
                                return p;
                            })
                        }
                    }
                    return e;
                })
            }
        default:
            return preState;
    }
}

function ManageSeason() {
    const { seasonId } = useParams();
    const title = Number.isInteger(Number.parseInt(seasonId)) ? "Edit Season" : "Create Season";
    const { state } = useLocation();
    const [data, dispatch] = useReducer(reducer, state);
    const [loader, setLoader] = useState(false);
    const { authToken, getSeasons, admin } = useAppContext();

    const navigate = useNavigate();

    const onChangeSeasonName = (e) => {
        dispatch({ type: CHANGE_SEASON_NAME, value: e.target.value });
    };

    const onChangeStartSeason = (e) => {
        dispatch({ type: CHANGE_START_SEASON, value: e.target.value });
    }

    const onChangeEndSeason = (e) => {
        dispatch({ type: CHANGE_END_SEASON, value: e.target.value });
    }

    const onChangeSponsor = (e) => {
        dispatch({ type: CHANGE_SPONSOR, value: e.target.value });
    }

    const onChangeQuanity = (e) => {
        dispatch({ type: CHANGE_QUANITY, value: isNaN(Number.parseInt(e.target.value)) ? 0 : Number.parseInt(e.target.value) });
    }

    const checkValidData = () => {
        if (data.name === "" || data.startDate === "" || data.endDate === "" || data.sponsor === "" || data.quanity <= 1 || data.clubs.length !== data.quanity) {
            toast.error("Please fill all the fields");
            return false;
        }
        else {
            const startDate = new Date(data.startSeason);
            startDate.setDate(startDate.getDate() + (data.quanity - 1 * 2) * 7);
            const endDate = new Date(data.endSeason);
            const playerClubError = data.clubs.find(e => e.players.length < 11);
            const numberJerseyError = data.clubs.find(e => e.numberJersey.length !== e.players.length);
            if (playerClubError !== undefined || numberJerseyError !== undefined) { 
                toast.error("Not enough players in club or number jersey is not enough");
                return false;
            }
            if (startDate.getTime() > endDate.getTime()) {
                toast.error("Not enough time for the season to finish");
                return false;
            }
            if (data.clubs.find(e => e.coach === undefined) !== undefined) {
                toast.error("Please add coach for all clubs");
                return false;
            }
            if(data.clubs.find(e => e.numberJersey.find(p => p === 0) !== undefined) !== undefined) {
                toast.error("Please select number jersey for all players");
                return false;
            }
            return true;
        }
    }

    const onClickAdd = async () => {
        if (!checkValidData())
            return;
        console.log(data)
        setLoader(true);
        const url = "http://localhost:8088/api/v1/admin/season";
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken,
            },
            body: JSON.stringify(data),
        }
        const response = await fetch(url, options);
        if (response.ok) {
            setLoader(false);
            getSeasons();
            toast.success("Add season successfully");
        }
        else {
            setLoader(false);
            const error = await response.json();
            toast.error("Error: " + error.message);
        }
    }

    const onClickEdit = async () => {
        if (!checkValidData())
            return;
        console.log(data);
        setLoader(true);
        const url = `http://localhost:8088/api/v1/admin/season`;
        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken,
            },
            body: JSON.stringify(data),
        }
        const response = await fetch(url, options);
        if (response.ok) {
            setLoader(false);
            getSeasons();
            toast.success("Edit season successfully");
        }
        else {
            setLoader(false);
            const error = await response.json();
            toast.error("Error: " + error.message);
        }
    }

    return (
        <FuncContainer title={title}>
            <div className="h-fit w-screen p-10 left-0 flex absolute gap-10">
                <div className="h-fit w-1/4 flex flex-col gap-4">
                    <h1>Basic Information</h1>
                    <InputComponent field={"Name"} type={"text"} valueInput={data.name} onChangeInput={onChangeSeasonName} />
                    <InputComponent field={"Start date"} type={"date"} valueInput={data.startSeason} onChangeInput={onChangeStartSeason} />
                    <InputComponent field={"End date"} type={"date"} valueInput={data.endSeason} onChangeInput={onChangeEndSeason} />
                    <InputComponent field={"Sponsor"} type={"text"} valueInput={data.sponsor} onChangeInput={onChangeSponsor} />
                    <InputComponent field={"Quanity"} type={"text"} valueInput={data.quanity} onChangeInput={onChangeQuanity} />
                    <div className="flex flex-col justify-center items-center">
                        {title === "Edit Season" && <EditButton className={"h-[40px] w-[100px]"} onClick={onClickEdit} />}
                        {title === "Create Season" && <AddButton className={"h-[40px] w-[100px]"} onClick={onClickAdd} />}
                    </div>
                </div>
                <SelectClub number={data.quanity} dispatch={dispatch} clubs={data.clubs} />
                {loader && <Loader />}
            </div>
        </FuncContainer>
    );
}

export default ManageSeason;