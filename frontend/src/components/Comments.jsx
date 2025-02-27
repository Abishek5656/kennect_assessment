const Comments = ({ comments }) => {
    return (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Comments:</h3>
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="mt-2 p-2 border-b last:border-none">
                        <p className="text-gray-800">{comment.text}</p>
                        <p className="text-sm text-gray-500">- {comment.author}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments;
