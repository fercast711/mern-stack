import axios from 'axios'

export const getPostsRequest = async()=>
    await axios.get('/posts')

export const createPostsRequest = async(posts)=>{
    const form = new FormData()
    for(let key in posts){
       form.append(key, posts[key]) 
    }
    return await axios.post('/posts',form,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deletePostRequest = async(id)=>
    await axios.delete(`/posts/${id}`)

export const getPostRequest = async(id)=>
    await axios.get(`/posts/${id}`)

export const updatePostRequest = async(id,newField)=>{
    const form = new FormData()
    for(let key in newField){
        form.append(key, newField[key])
    }
    return await axios.put(`/posts/${id}`,form, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}
    