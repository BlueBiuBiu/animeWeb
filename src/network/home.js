import {request} from 'network/request'

export function getHomeAnime(){
    return request({
        url: '/AllAnime'
    })
}
