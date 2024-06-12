const listAll = async () => {
    try {
        let response = await fetch('http://localhost:8000/api/qc/presses', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

const listByName = async (params) => {
    try {
        let response = await fetch('http://localhost:8000/api/qc/presses/customer/' + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

const listById = async (params, credentials) => {
    try {
        let response = await fetch('http://localhost:8000/api/qc/presses/' + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

const removeById = async (params, credentials) => {
    try {
        let response = await fetch('http://localhost:8000/api/qc/presses/' + params, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

const updateById = async (params, data, credentials) => {
    try {
        let response = await fetch('http://localhost:8000/api/qc/presses/' + params, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

export { 
    listAll,
    listByName,
    listById,
    removeById,
    updateById
}