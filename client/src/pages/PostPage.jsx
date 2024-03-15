import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
    const { postSlug } = useParams();
    const [ loading, setLoading ] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [ error, setError ] = useState(false);
    const [ post, setPost ] = useState(null);
    const [ recentPosts, setRecentPosts ] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                    
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }

        }
        fetchPost();
    }, [ postSlug ]);

    // recent articles
    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts();
            
        } catch (error) {
            console.log(error.message)
        }

    }, [])

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl"/>
        </div>
    );
    


    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post && post.title}            
            </h1>

            <Link className="self-center mt-5" to={`/search?category=${post && post.category}`}>
            <Button  color="gray" pill size="xs">
                {post && post.category}
            </Button>
            </Link>

            <img src={post && post.image} alt={post && post.title} 
                className="p-3 mt-10 max-h-[600px] w-full object-cover"
            />

            <div className="flex justify-between p-3 border-b border-b-green-600 mx-auto w-full max-w-2xl text-xs ">
                <span>
                    {post && new Date(post.createdAt).toLocaleDateString()}
                </span>

                <span className="italic">
                    {post && (post.content.length / 300).toFixed(0)} min read
                </span>
            </div>

            <div
                dangerouslySetInnerHTML={{__html: post && post.content}}
                className="p-3 max-w-2xl mx-auto w-full post-content-styled-in-indexcss"  
            >
            </div> 



            <div className="max-w-4xl mx-auto w-full">
                <CallToAction />
            </div>

            <CommentSection postId={post._id} />

            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recent  Articles</h1>
                <div className="">
                    {
                        recentPosts &&
                        recentPosts.map((post) => {
                            <PostCard key={post._id} post={post} />
                        })
                    }
                </div>
            </div>
        </main>
    )
}
