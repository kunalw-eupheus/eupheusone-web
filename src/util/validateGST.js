
const validateGST = (gst) => {
    let regex = new RegExp(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/)
 
    if (gst == null) {
        return false;
    }
 
    if (regex.test(gst) == true) {
        return true;
    }
    else {
        return false;
    }

}

export default validateGST