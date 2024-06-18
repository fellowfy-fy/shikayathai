import "./Comments.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import api from "../../../api/axios";
// import profilePlaceholder from '../../../assets/profilePlaceholder.png';


const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

const Comments = ({ initialComments }) => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      user: auth?.name,
      complaint: id,
      text: newComment,
    };
    try {
      const apiResponse = await api.post(
        "complaints/comments/create/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      );
      console.log(apiResponse);
      setComments([...comments, apiResponse.data]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#001A45] bg-opacity-5 pb-10">
    <div className=" p-6 mx-auto md:ml-[120px] md:mr-[120px] ">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold text-[#001A45] mb-6">Comments {comments.length}</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-1 p-1">
              <div className="flex items-center mb-2">
                <img
                  src={`http://localhost:8000${comment.userpic}`}
                  alt="Commenter avatar"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg text-[#001A45]">
                    {comment.user_name}
                  </h4>
                  <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString('en-US', options)}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{comment.text}</p>
            </div>
          ))}
          <button className="bg-[#FFFFFF] text-[#001A45] py-2 px-4 rounded-[2rem] w-80 h-11 border-[#001A45] border">read more</button>
        </div>
        <div className="lg:col-span-1">
        <h4 className="text-xl font-bold text-[#001A45] mb-6">New comment</h4>
          <div className="rounded-lg">
            {auth.access ? (
              <>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                  className="w-full p-2 rounded-lg mb-4 h-32 resize-none border border-[#001A45] border-opacity-70 bg-[#001A45] bg-opacity-0 "
                ></textarea>
                <button
                  onClick={handleCommentSubmit}
                  className="bg-[#C9FF57] text-[#001A45] py-2 w-full rounded-lg font-bold"
                >
                  Add comment
                </button>
              </>
            ) : (
              <button className="bg-[#C9FF57] text-[#001A45] py-2 px-4 rounded-lg">Login to comment</button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Comments;
