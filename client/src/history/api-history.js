export const createHistory = async (bieumau, token) => {
    try {
        let response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/history', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(bieumau)
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}
