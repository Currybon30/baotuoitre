const listAll = async () => {
    try {
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses', {
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

const searchName = async (name) => {
    try {
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses/customer?name=' + name, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        return await response.json()
    }
    catch (err) {
        return err.json()
    }
}

const searchNameCaseInsensitive = async (name) => {
    try {
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses/customer/case-insensitive?name=' + name, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        return await response.json()
    }
    catch (err) {
        return err.json()
    }
}

const listById = async (params, credentials) => {
    try {
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses/' + params, {
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
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses/' + params, {
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
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses/' + params, {
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

const deleteMultiItems = async (itemArray, credentials) => {
    try {
        let res = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/qc/presses/delete-many', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemArray)
        })
        return await res.json()
    }
    catch (err) {
        console.log(err)
    }
}

export { 
    listAll,
    searchName,
    searchNameCaseInsensitive,
    listById,
    removeById,
    updateById,
    deleteMultiItems
}
