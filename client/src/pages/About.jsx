export default function About() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
            <div>
            <h1 className='text-3xl font font-semibold text-center my-7'>
                About Chess Blog
            </h1>
            <div className='text-md text-gray-500 flex flex-col gap-6'>
                <p>
                Welcome to Chess Blog! This blog was created by Nzemia, alias, Frank
                as a personal project to share his thoughts and ideas with the
                world. Frank is a passionate developer who loves to write about
                technology, coding, and everything in between.
                </p>

                <p>
                On this blog, you will find weekly articles, updates and tutorials on topics
                on chess, so be sure to check back often for new content!
                </p>

                <p>
                We encourage you to leave comments on our posts and engage with
                other readers. You can like other peoples comments and reply to
                them as well. We believe that a community of learners can help
                each other grow and improve. Also, be sure to suggest your topics 
                which you would like to see on this blog.
                </p>
            </div>
            </div>
        </div>
        </div>
    );
}