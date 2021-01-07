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

export function getCommentByAnimeId(animeId){
  return request({
    url: "/comment",
    params: {
      animeId
    }
  })
}

export function uploadCommentInfo(animeId,content,userId,commentId=null){
  return request({
    url: `/comment/${userId}`,
    method: "POST",
    data: {
      animeId,
      content,
      commentId
    }
  })
}