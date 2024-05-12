const exportByMonth = async (month) => {
    try {
        const response = await fetch('http://localhost:3000/api/export/exportByMonth/' + month, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('response:', response);
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error as needed
    }
}

export { exportByMonth };