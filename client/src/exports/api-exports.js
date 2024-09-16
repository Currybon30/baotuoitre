const server_url = import.meta.env.VITE_SERVER_URL;
const exportByMonth = async (year, month, token) => {
    try {
        const response = await fetch(server_url +'/api/export/exportByMonth/' + year + '/' + month, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error as needed
    }
}

const exportByPage = async (year, month, token) => {
    try {
        const response = await fetch(server_url +'/api/export/exportByPage/' + year + '/' + month, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error as needed
    }
}

const exportByDay = async (year, month, day, token) => {
    try {
        const response = await fetch(server_url +'/api/export/exportByDay/' + year + '/' + month + '/' + day, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return await response.json();
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error as needed
    }
}



export { exportByMonth, exportByPage, exportByDay };
