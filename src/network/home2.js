import {request} from "./request2"

export function getAvatarById(id){
  return request({
    url: `/user/${id}/avatarUrl`
  })
}

export function uploadAvatar(id,avatar){
  return request({
    url: `/avatar/upload/${id}`,
    method: "POST",
    data: avatar
  })
} 

