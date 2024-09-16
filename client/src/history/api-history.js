const server_url = import.meta.env.VITE_SERVER_URL;
export const createHistory = async (bieumau, token) => {
    try {
        let response = await fetch(server_url +'/api/history', {
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
