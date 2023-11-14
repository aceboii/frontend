import React, { useState, useEffect, } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import HomePosts from '../components/HomePosts'
import { useSelector } from "react-redux";
import { server } from '../server'

const Blog = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Posts />
      <Footer />
    </div>
  );
};

const Posts = () => {
  // console.log(search)
  const { search } = useLocation()
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useSelector((state) => state.user);
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(server + "/blog" + search)
      // console.log(res.data)
      setPosts(res.data)
      if (res.data.length === 0) {
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setLoader(false)

    }
    catch (err) {
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchPosts()

  }, [search])



  return (

    <>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ?
          posts.map((post) => (
            <>
              <Link to={user ? `/blog/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>

          )) : <h3 className="text-center font-bold mt-16">No posts available</h3>}
      </div>
    </>

  )
}


export default Blog;
