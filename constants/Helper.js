export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function makePriceString(from, to) {
    if (!from) {
        return formatNumber(to);
    } else if (!to) {
        return formatNumber(from);
    } else {
        return formatNumber(from) + ' - ' + formatNumber(to);
    }
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