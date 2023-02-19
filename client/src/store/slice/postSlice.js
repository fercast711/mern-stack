import { createSlice } from "@reduxjs/toolkit";
import { getPostsRequest, createPostsRequest, deletePostRequest, getPostRequest, updatePostRequest } from "../../api/posts.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostsGet = createAsyncThunk(
    'post/fetchPostsGet',
    async()=>{
        const response = await getPostsRequest()
        return response.data
    }
)

export const fetchCreatePost = createAsyncThunk(
    'post/fetchCreatePost',
    async(post)=>{
        try {
            const res = await createPostsRequest(post)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchDeletePost = createAsyncThunk(
    'post/fetchDeletePost',
    async(id)=>{
        try {
            await deletePostRequest(id)
            return id
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchPostGet = createAsyncThunk(
    'post/fetchPostGet',
    async(id)=>{
        try {
           const response = await getPostRequest(id)
           return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchPostUpdate = createAsyncThunk(
    'post/fetchPostUpdate',
    async(objeto)=>{
        try {
            //console.log(objeto)
            await updatePostRequest(objeto.id, objeto.newField)
            
        } catch (error) {
            console.log(error)
        }
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState:{
        posts: [],
        postGet: {
            title: "",
            description: "",
            image: null
        }
    },
    reducers:{
        setPostGet: (state,actions)=>{
            state.postGet.title = ""
            state.postGet.description = ""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPostsGet.fulfilled, (state, actions)=>{
            state.posts = [...actions.payload]
        })
        builder.addCase(fetchCreatePost.fulfilled, (state,actions)=>{
            state.posts = [...state.posts, actions.payload]
        })
        builder.addCase(fetchDeletePost.fulfilled, (state, actions)=>{
            state.posts = [...state.posts.filter(item => item._id !== actions.payload)]
        })
        builder.addCase(fetchPostGet.fulfilled,(state, actions)=>{
            state.postGet.title = actions.payload.title
            state.postGet.description = actions.payload.description
        })
        builder.addCase(fetchPostUpdate.fulfilled)
    }
})

export const {setPostGet} = postSlice.actions
export default postSlice.reducer