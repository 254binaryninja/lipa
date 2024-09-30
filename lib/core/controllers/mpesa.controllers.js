import NodeCache from 'node-cache';

const cache = new NodeCache();


let recentCallBackData = [];

export function storeCallBackData(data) {
    recentCallBackData.push(data);
    cache.set("recentCallBackData",recentCallBackData);
}

export function getCallBackData() {
    return cache.get("recentCallBackData");
}