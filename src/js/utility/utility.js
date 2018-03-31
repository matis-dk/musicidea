import React from 'react'
import { Icon, notification } from 'antd';

import albumDefault from '../../img/album-default.svg'
import userDefault from '../../img/user-default.svg'

//==================================================================
export function sortArrayOfObjects (a, b) {
    if (a.last_nom < b.last_nom)
      return -1;
    if (a.last_nom > b.last_nom)
      return 1;
    return 0;
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
