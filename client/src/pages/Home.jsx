import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Spinner } from "flowbite-react";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        if(!res.ok){
   
        setLoading(false);
        return;
      }else{
        setPosts(data.posts);
        setLoading(false);
      }

        
      } catch (error) {
        setLoading(false)
      }
    };
    fetchPosts();
  }, []);
  if(loading){
    return(
      <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl'/>
    </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 p-28 px-4 max-w-6xl max-auto">
        <h1 className="p-5 text-3xl lg:text-6xl font-semibold ">Welcome to the <span className="text-purple-700 font-bold ">BlogHere.com</span> </h1>
        <p className="text-gray-500 tex-xs ">The BlogHere.com is always here to help you out in differn documentation of the new trending technology where you can build you own model, software that can be help you get new skills </p>
      <Link to = '/search' className="text-xs sm:text-sm font-bold text-blue-400 hover:underline px-10">
        View all posts
      </Link>
      </div>
      <div className=" p-3 bg-amber-100 dark:bg-slate-700  flex justify-center items-center max-auto mb-5">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col p-3 gap-6 py-7 ">
      {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex gap-5 flex-wrap mx-auto justify-center'>
            {
              posts.map((post)=>(
                <PostCard key={post._id} post={post} />
              ))
            }
           
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}