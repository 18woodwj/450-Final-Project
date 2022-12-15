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

const getSaved = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/saved`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getWrapped,
    getSongs,
    getCharts,
    login,
    getSaved
}