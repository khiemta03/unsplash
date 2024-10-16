function isEmptyObj(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
}

export default isEmptyObj