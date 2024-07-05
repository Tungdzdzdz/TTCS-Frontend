import { useRef, useState } from "react";
import Filter from "../hcom/Filter";
import { formationOptions, squadOptions } from "../hcom/FilterOptions";
import Select from 'react-select';
import { toast } from "react-toastify";

function SelectSquad({ club, match, setMatch, home, players, squad, setSquad, formation }) {
    const squadFilterRef = useRef();

    const [selected, setSelected] = useState(() => {
        return players.map((player, i) => {
            if (squad.length === 0)
                return {
                    selected: false,
                    type: undefined
                }
            const obj = squad.find(e => e.playerStatId === player.id);
            if(!obj)
                return {
                    selected: false,
                    type: false
                }
            else
                return {
                    selected: true,
                    type: obj.type
                }
        })
    });

    const onChangeFormationFilter = (optionSelected) => {
        if (home) {
            setMatch({
                ...match,
                homeFormation: optionSelected.value
            });
        } else {
            setMatch({
                ...match,
                awayFormation: optionSelected.value
            });
        }
    };

    const onChangePlayer = (i) => {
        if (squad.length >= 18 && selected[i].selected === false) {
            toast.error("Squad is full");
            return;
        }
        const newSelected = [...selected];
        newSelected[i].selected = !newSelected[i].selected;
        newSelected[i].type = false;
        setSelected(newSelected);
        if (newSelected[i].selected) {
            squad.push({
                matchId: match.id,
                playerStatId: players[i].id,
                clubStatId: club.id,
                type: false
            })
        }
        else {
            squad = squad.filter(e => e.playerStatId !== players[i].id)
        }
        setSquad(squad);
    }

    const onChangeSquad = (optionSelected, i) => {
        if(optionSelected.value == true && selected.reduce((pre, cur, curIndex) => cur.type ? pre+1:pre, 0) == 11)
        {
            toast.error("Squad have only 11 main player!")
            return;
        }
        const newSelected = [...selected];
        newSelected[i].type = optionSelected.value;
        setSelected(newSelected);
        const newSquad = [...squad];
        const index = newSquad.findIndex(e => e.playerStatId === players[i].id);
        if(index < 0)
            return;
        newSquad[index].type = optionSelected.value;
        setSquad(newSquad);
    }

    return (
        <div className="h-fit w-fit flex flex-col gap-4 px-2">
            <div className="flex justify-center items-center gap-2">
                <img src={club.club.logo} className="h-[100px]" />
                <div className="w-full h-full">
                    <Filter options={formationOptions}
                        className={"flex items-center justify-center"}
                        onChange={onChangeFormationFilter}
                        defaultValue={{ label: formationOptions.find(f => f.value === formation).label, value: formation }}
                    />
                </div>
            </div>
            <div className="h-[500px] w-full flex flex-col gap-4">
                <div className="h-fit w-full grid-cols-8 grid px-5">
                    <div className="col-span-5">
                        <label>Name</label>
                    </div>
                    <div className="col-span-1 justify-center">
                        <label>Selected</label>
                    </div>
                </div>
                <div className="h-full w-full flex flex-col overflow-y-scroll gap-4 px-5 pb-5">
                    {
                        players.map((player, i) => {
                            return (
                                <div className="h-fit w-full grid grid-cols-8 border-gray-200 border-b-2" key={i}>
                                    <div className="flex col-span-5 items-center gap-2">
                                        <img src={player.player.img} className="rounded-full h-[40px]" />
                                        <p>{player.player.name}</p>
                                    </div>
                                    <div className="flex col-span-1 justify-center items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4"
                                            onChange={(e) => onChangePlayer(i)}
                                            checked={selected[i].selected}
                                        />
                                    </div>
                                    {
                                        selected[i].selected &&
                                        <div className="flex col-span-2 items-end h-[40px]">
                                            <Select
                                                className="w-full"
                                                options={squadOptions}
                                                placeholder={"Squad"}
                                                defaultValue={selected[i].type === false ? squadOptions[0] : squadOptions.find(e => e.value === selected[i].type)}
                                                onChange={(e) => onChangeSquad(e, i)}
                                                ref={squadFilterRef}
                                                />
                                        </div>
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SelectSquad;