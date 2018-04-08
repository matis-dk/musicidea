import React from 'react'
import { Icon, notification } from 'antd';

import albumDefault from '../../img/album-default.svg'
import userDefault from '../../img/user-default.svg'

//==================================================================
export function sortArrayOfObjects (arrayItems, arrayKey) {
    return arrayItems.sort(sortCallback)

    function sortCallback (a, b) {
            if (a[arrayKey] < b[arrayKey]) { return 1; }
            if (a[arrayKey] > b[arrayKey]) { return -1; }
            return 0;
    }

}


//==================================================================

export function convertMsToMin (ms) {
    let minutes = Math.floor(ms / 60000).toString();
    let seconds = ((ms % 60000) / 1000).toFixed(0);

    if (minutes.length == 1) { minutes = "0" + minutes }

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function convertMusicNr (index) {
    index = index + 1;
    if ( index < 10 ) {
        return "0" + index
    }
    return index
}

//==================================================================

export function openNotification (msg = "Ukendt fejl", des = "Noget gik helt galt", icontype = "meh") {
    notification.config({
        placement: 'bottomLeft'
    });
    notification.open({
        message: msg,
        description: des,
        icon: <Icon type={icontype} style={{ color: '#108ee9' }} />,
    });
}

//==================================================================

export function getTimestamp () {
    return (+ new Date() + "")
}


//==================================================================

export function getImage (images, matchWidth = 200, type = "user") {

    if ( images.length === 0) {
        if (type == "user") {  return userDefault }
        if (type == "album") { return albumDefault }
    }

    for (let i = (images.length - 1); i >= 0; i--) {

        if ( images[i].width >= matchWidth ) {
            return images[i].url
        }

        if ( i == 0 ) {
            return images[i].url
        }

    }
}

//==================================================================


export function handleSkipping (playback, method) {

    let { queue, currentTrack, shuffle, repeat } = playback;
    let i = findTrackInQueue(queue, currentTrack)

    if (shuffle) {
        return randomIntFromInterval(0, queue.length)
    }

    if (repeat) {
        return i;
    }

    if (method == "skipToNext") {
        return (i == (queue.length - 1)) ? 0 : i + 1;
    }

    if (method == "skipToPrevious") {
        return (i == 0 ) ? 0 : i - 1;
    }

}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


function findTrackInQueue (queue, currentTrack) {
    for ( let i = 0; i < queue.length; i++ ) {
        if (queue[i].timestamp == currentTrack) {
            return i;
        }
    }

    return 0;
}

//==================================================================

export function utilGetUrisFromTrack (queue) {
    return queue.map((item) => item.uri)
}
