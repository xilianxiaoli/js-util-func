 
export function isPhoneNumber(phone) {
    let result = false;
    const phoneReg = /^(1[1-9][0-9])[0-9]{8}$/;

    if (phone) {
        result = phoneReg.test(phone);
    }
    return result;
}

