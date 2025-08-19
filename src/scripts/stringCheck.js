export function isAlphanumeric (str){
    return /^[a-z0-9]+$/i.test(str);
}

export function isNumberic (str){
    if (typeof str != "string") return false;

    const cleaned = str.replace(/, /g, "")

    return !isNaN(cleaned) && ! isNaN(parseFloat(cleaned));
}