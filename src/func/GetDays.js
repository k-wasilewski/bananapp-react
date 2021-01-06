const GetDays = (score) => {
    let days;

    switch(true) {
        case score===1.0:
            days='1 day';
            break;
        case score===2.0:
            days='2 days';
            break;
        case score===3.0:
            days='3 days';
            break;
        case score===4.0:
            days='4 days';
            break;
        case score===5.0:
            days='5 days';
            break;
        case score===6.0:
            days='6 days';
            break;
        case score===7.0:
            days='7 days';
            break;
        default:
            days='[error]';
            break;
    }

    return days;
}

export default GetDays;