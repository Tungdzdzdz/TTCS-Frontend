export const playerStatOptions = [
    {
        value: "1",
        label: "Goal",
    },
    {
        value: "2",
        label: "Yellow Card",
    },
    {
        value: "3",
        label: "Red Card",
    },
    {
        value: "4",
        label: "Shot",
    },
    {
        value: "5",
        label: "Appearance",
    },
    {
        value: "6",
        label: "Assist",
    },
    {
        value: "7",
        label: "Saves",
    },
    {
        value: "8",
        label: "Foul",
    },
    {
        value: "9",
        label: "Offside",
    },
]

export const clubStatOptions = [
    {
        value: "1",
        label: "Goal Taken",
    },
    {
        value: "2",
        label: "Yellow Card",
    },
    {
        value: "3",
        label: "Red Card",
    },
    {
        value: "4",
        label: "Clean Sheet",
    },
    {
        value: "5",
        label: "Win",
    },
    {
        value: "6",
        label: "Draw",
    },
    {
        value: "7",
        label: "Lose",
    },
    {
        value: "8",
        label: "Goal Received",
    },
    {
        value: "9",
        label: "Saves",
    },
    {
        value: "10",
        label: "Foul",
    },
    {
        value: "11",
        label: "Offside",
    },
]

export const roleOptions = [
    {
        value: "All",
        label: "All",
    },
    {
        value: "ADMIN",
        label: "Admin",
    },
    {
        value: "USER",
        label: "User",
    },
]

export const countryOptions = await fetch("http://localhost:8088/api/v1/country")
                            .then(response => response.json())
                            .then(data => {
                                return data.map(e => {
                                    return {
                                        value: e.id,
                                        label: e.name
                                    }
                                })
                            });

export const locationOptions = await fetch("http://localhost:8088/api/v1/location")
                            .then(response => response.json())
                            .then(data => {
                                return data.map(e => {
                                    return {
                                        value: e.id,
                                        label: e.name
                                    }
                                })
                            });

export const positionOptions = await fetch("http://localhost:8088/api/v1/position")
                            .then(response => response.json())
                            .then(data => {
                                return data.map(e => {
                                    return {
                                        value: e.id,
                                        label: e.name
                                    }
                                })
                            });

export const formationOptions = await fetch("http://localhost:8088/api/v1/formation")
                            .then(response => response.json())
                            .then(data => {
                                return data.map(e => {
                                    return {
                                        value: e.id,
                                        label: e.name
                                    }
                                })
                            });

export const squadOptions = [
    {
        label: "Sub",
        value: false
    },
    {
        label: "Main",
        value: true
    }
]     

export const eventOptions = await fetch("http://localhost:8088/api/v1/event")
                            .then(response => response.json())
                            .then(data => {
                                return data.map(e => {
                                    return {
                                        value: e.id,
                                        label: e.name
                                    }
                                })
                            });