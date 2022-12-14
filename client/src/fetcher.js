import config from './config.json'

const getWrapped = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/wrapped`, {
        method: 'GET',
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

export {
    getWrapped,
    getSongs,
    getCharts
}