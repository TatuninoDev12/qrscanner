function getImageQR(data: any) {
    let imagesUlR = '';
    const contElem = document.getElementsByTagName('ion-card').length;
    for (var i = 0; i < contElem; i++) {
        var contChild = document.getElementsByTagName('ion-card')[i].childNodes.length;
        for (var j = 0; j < contChild; j++) {

            var elem = document.getElementsByTagName('ion-card')[i]?.childNodes[j]?.textContent?.split('e:') || '';
            if (elem.length > 1) {
                if (elem[1].includes(data)) {
                    imagesUlR = document.getElementsByTagName('ion-card')[i].childNodes[j - 1].childNodes[0].childNodes[0].nodeValue || '';
                }
            }
        }
    }

    return imagesUlR;
}

export default getImageQR