import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL: 'http://172.81.242.56:8181',
        timeout: 10000
    })
    instance.interceptors.request.use(config => {
        return config
    },err =>{
        console.log(err)
    })
    instance.interceptors.response.use(res => {
        return res.data
    },err =>{
        console.log(err)
    })

    return instance(config)
}
