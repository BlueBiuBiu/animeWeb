import {request} from 'network/request'


export function getHomeAnime(){
    return request({
        url: '/AllAnime'
    })
}


export function getAnimeType(type,place,birth,language){
    return request({
        url: '/JapanAnimeSelect/'+String(type)+'/'+String(place)+'/'+String(birth)+'/'+String(language),
    })
}

export function getAnimeTypePage(type,place,birth,language,page,size){
    return request({
        url: '/JapanAnimeSelect/'+String(type)+'/'+String(place)+'/'+String(birth)+'/'+String(language)+'/'+String(page)+'/'+String(size),
    })
}
