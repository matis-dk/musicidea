import React from 'react'
import { Icon, notification } from 'antd';

export function sortArrayOfObjects (a, b) {
    if (a.last_nom < b.last_nom)
      return -1;
    if (a.last_nom > b.last_nom)
      return 1;
    return 0;
}


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
