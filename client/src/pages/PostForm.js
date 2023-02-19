import {Formik, Form, Field, ErrorMessage} from "formik"
import { fetchCreatePost, fetchPostGet, fetchPostUpdate, setPostGet } from "../store/slice/postSlice"
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export const PostForm = ({dispatch}) => {
  const navigate = useNavigate()
  const params = useParams()
  const{postGet} = useSelector(state => state.post)
  useEffect(()=>{
    if(params.id ){
      dispatch(fetchPostGet(params.id))
    }else{
      dispatch(setPostGet())
    }
  }, [])
  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">Go Back</Link>
        </header>
      <Formik
      initialValues={postGet}
      enableReinitialize
      validationSchema={Yup.object({
        title: Yup.string().required("Title is Require"),
        description: Yup.string().required("Description is Require")
      })}
      onSubmit={(values, actions)=>{
        console.log(values)
        if(params.id){
          dispatch(fetchPostUpdate({id: params.id, newField: values}))
        }else{
          dispatch(fetchCreatePost(values))
        }
        actions.setSubmitting(false)
        navigate('/')
      }}
      >
        {({handleSubmit, setFieldValue, isSubmitting})=>(
          <Form onSubmit={handleSubmit}>
          <label htmlFor="title"
          className="text-sm font-bold text-gray-400 ">
            Title
          </label>

          <Field 
          name='title' 
          placeholder='Title' 
          className='px-3 py-2 focus:outline-none rounded bg-gray-600
          text-white w-full mb-4' />

          <ErrorMessage component="p" className="text-red-400 text-sm" name="title" />
          
          <label htmlFor="description"
          className="text-sm font-bold text-gray-400 ">
            Description
          </label>

          <Field 
          component="textarea"
          name='description' 
          className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
          placeholder='Description'
          rows={3}/>

          <ErrorMessage component="p" className="text-red-400 text-sm" name="description"/>
          
          <input type="file" name="image" 
          className="px-3 py-2 focus:outline-none rounded-none 
          bg-gray-600 text-white w-full"
          onChange={(e)=> setFieldValue('image',e.target.files[0])}/>

          <button type="submit" 
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded 
          mt-2 text-white focus:outline-none disabled:bg-indigo-400"
          disabled={isSubmitting}>
            {isSubmitting? (<AiOutlineLoading3Quarters className="animate-spin h-5 w-5"/>): "Save"}
          </button>

        </Form>
        )}
        
      </Formik>
      </div>
    </div>
  )
}
