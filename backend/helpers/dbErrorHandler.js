const getErrorMessage = (err) => {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    }
    return err.message || "Unknown error";
};

export default { getErrorMessage };