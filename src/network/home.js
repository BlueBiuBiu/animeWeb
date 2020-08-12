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

export function getAnimePlayIndex(id,index){
    return request({
        url: '/AllAnime/' + String(id) +'/' +String(index)
    })
}

export function getUserInfo(username,password){
    return request({
        url: '/login/' + String(username) +'/' +String(password)
    })
}

export function insertUserInfo(username,password,id,data){
    return request({
        method: "POST",
        url: '/login/' + String(username) +'/' +String(password) + '/' + String(id),
        data: data,
        header:{
            'Content-Type':'application/json'  
        }
    
    })
}