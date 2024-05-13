const exportByMonth = async (month) => {
    try {
        const response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/export/exportByMonth/' + month, {
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

const exportByPage = async (month) => {
    try {
        const response = await fetch('https://thuytrang-tuoitre-server.onrender.com/api/export/exportByPage/' + month, {
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


export { exportByMonth, exportByPage };