export const create = async (bieumau) => {
    try {
        let response = await fetch('http://localhost:3000/api/qc/presses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bieumau)
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

