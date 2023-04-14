const validatePan = (panCardNo) => {
    let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
 
    if (panCardNo == null) {
        return false;
    }
 
    if (regex.test(panCardNo) == true) {
        return true;
    }
    else {
        return false;
    }

}

export default validatePan