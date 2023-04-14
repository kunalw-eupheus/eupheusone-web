
const validateAadhar = (aadhar) => {
    let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)
 
    if (aadhar == null) {
        return false;
    }
 
    if (regex.test(aadhar) == true) {
        return true;
    }
    else {
        return false;
    }

}

export default validateAadhar