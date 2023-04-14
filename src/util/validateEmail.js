
const validateEmail = (email) => {
    let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
 
    if (email == null) {
        return false;
    }
 
    if (regex.test(email) == true) {
        return true;
    }
    else {
        return false;
    }

}

export default validateEmail