import React from 'react';

const BlogCard = ({blog,index}) => {
    return (
        <div className='blog-card fromTop'>
            <h6><span className="Q-A">Question {index+1}:</span> {blog.quest}?</h6>
            <p>
                <span className="Q-A">Answer :</span><br />
                {blog.ans}
            </p>
        </div>
    );
};

export default BlogCard;