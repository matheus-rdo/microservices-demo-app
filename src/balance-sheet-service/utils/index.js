class AppError {
    constructor(description, httpCode = 500, isOperational = true) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.description = description;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomElements(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

module.exports = {
    AppError: AppError,
    getRandomInt,
    getRandomElements
}