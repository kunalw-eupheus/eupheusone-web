const validateIFSC = (ifsc) => {
    let regex = new RegExp(/^[A-Za-z]{4}\d{7}$/)
 
    if (ifsc == null) {
        return false;
    }
 
    if (regex.test(ifsc) == true) {
        return true;
    }
    else {
        return false;
    }

}

export default validateIFSC