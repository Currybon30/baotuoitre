const exportByMonth = async (year, month) => {
    try {
        const response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/export/exportByMonth/' + year + '/' + month, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error as needed
    }
}

const exportByPage = async (year, month) => {
    try {
        const response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/export/exportByPage/' + year + '/' + month, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error as needed
    }
}

const exportByDay = async (year, month, day) => {
    try {
        const response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/export/exportByDay/' + year + '/' + month + '/' + day, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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