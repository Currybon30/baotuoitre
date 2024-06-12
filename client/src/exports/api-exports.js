const exportByMonth = async (year, month, token) => {
    try {
        const response = await fetch('http://localhost:8000/api/export/exportByMonth/' + year + '/' + month, {
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
        const response = await fetch('http://localhost:8000/api/export/exportByPage/' + year + '/' + month, {
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
        const response = await fetch('http://localhost:8000/api/export/exportByDay/' + year + '/' + month + '/' + day, {
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