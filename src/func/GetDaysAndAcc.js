const GetDaysAndAcc = (prediction) => {
    let resultArr = [];
    const scoreRegex = /score:(.*?),/;
    const accRegex = /accuracy:(0\.\d\d)/;
    const score = scoreRegex.exec(prediction);
    const accuracy = accRegex.exec(prediction)[1];

    var days;
    switch(true) {
        case score[1]==='1.0':
            days='1 day';
            break;
        case score[1]==='2.0':
            days='2 days';
            break;
        case score[1]==='3.0':
            days='3 days';
            break;
        case score[1]==='4.0':
            days='4 days';
            break;
        case score[1]==='5.0':
            days='5 days';
            break;
        case score[1]==='6.0':
            days='6 days';
            break;
        case score[1]==='7.0':
            days='7 days';
            break;
        default:
            days='[error]';
            break;
    }

    resultArr.push(days, accuracy);
    return resultArr;
}

export default GetDaysAndAcc;