let M5URL = ''

if(process.env.NODE_ENV == 'development'){
    // M5URL = '/m5'
    M5URL = 'http://www.mash5.cc/mashWebServices/service/mash5/rest'
}else{
    M5URL = 'http://www.mash5.cc/mashWebServices/service/mash5/rest'
}

export {
    M5URL
}

