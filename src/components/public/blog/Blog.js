import React from 'react';
import useFetching from '../../../hooks/useFetching';
import BlogCard from './BlogCard';


const Blog = () => {
    const blogs = useFetching('https://cryptic-tor-95332.herokuapp.com/blogs')


    return (
        <div className='container min-h-[calc(100vh-166.5px)] flex flex-col justify-start items-center gap-10 px-5 py-8 fadeIn'>
            <h3 className='text-center text-2xl sm:text-3xl font-medium'>Question and Answer</h3>
            <section className='flex flex-wrap justify-center items-center gap-8'>
                {
                    blogs.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index} />)
                }
            </section>
        </div>
    );
};

export default Blog;