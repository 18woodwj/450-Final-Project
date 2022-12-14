import config from './config.json'

const getWrapped = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/wrapped`, {
        method: 'GET',
    })
    return res.json()
}

const login = async(email) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/authenticate?email=${email}`, {
        method: 'POST',
    })
    return res.json()
}

const register = async(email, region) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/register?email=${email}&region=${region}`, {
        method: 'POST',
    })
    return res.json()
}

const getSongs = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs`, {
        method: 'GET',
    })
    return res.json()
}

const getCharts = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/charts`, {
        method: 'GET',
    })
    return res.json()
}

const getSaved = async (mood) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/saved?mood=${mood}`, {
        method: 'GET',
    })
    return res.json()
}

const getFriends = async (mood) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/friends`, {
        method: 'GET',
    })
    return res.json()
}

const putSong = async (name, artists) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/addSong?name=${name}&artists=${artists}`, {
        method: 'POST',
    })
    return res.json()
}

const addFriend = async (friend_email) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/addFriend?email=${friend_email}`, {
        method: 'POST',
    })
    return res.json()
}

export {
    getWrapped,
    getSongs,
    getCharts,
    login,
    getSaved,
    register,
    getFriends,
    putSong,
    addFriend
}