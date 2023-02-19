import { HomePage, PostForm, NotFound } from "./pages/index";
import {Routes, Route} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch()
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center ">
      <div className="px-10 container m-auto">
        <Routes>
          <Route path="/" element={<HomePage dispatch={dispatch}/>}/>
          <Route path="/new" element={<PostForm dispatch={dispatch}/>}/>
          <Route path="/posts/:id" element={<PostForm dispatch={dispatch}/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Toaster/>
      </div>
    </div>
  );
}

export default App;
