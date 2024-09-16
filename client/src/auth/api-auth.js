const signin = async (user) => {
    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    }
    catch (err) {
        return {error: 'Could not sign in'};
        // Handle error as needed
    }
}

const signout = async () => {
    try {
        const response = await fetch('/auth/signout', {
            method: 'GET'
        });
        return await response.json();
    }
    catch (err) {
        return {error: 'Could not sign out'};
        // Handle error as needed
    }
}

export { signin, signout };
