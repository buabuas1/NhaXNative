export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function makePriceString(from, to) {
    if (!from && !to) {
        return '-';
    }
    else if (!from) {
        return formatNumber(to);
    } else if (!to) {
        return formatNumber(from);
    } else {
        return formatNumber(from) + ' - ' + formatNumber(to);
    }
}

export function makePriceInVND(from, to) {
    let result = '';
    if (!from) {
        result = to / 1000000;
    } else if (!to) {
        result = from / 1000000;
    } else {
        result = from / 1000000 + ' - ' + to / 1000000;
    }
    return formatNumber(result) + ' triệu VND';
}

export function makeSquareString(square) {
    return square + 'm\u00B2';
}

export function makeHostTitle(host) {
    if (!!host) {
        return host.Name + ' - ' + host.Phone;
    } else {
        return '-';
    }
}