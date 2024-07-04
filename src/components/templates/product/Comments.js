import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({comments , productID}) => {
console.log("comments =>" , comments)

  return (
    <div className="flex flex-wrap w-full">
      
      <p>نظرات ( {comments.filter(comment => comment.isAccept).length} ) :</p>
      <hr />

      <main className="w-full  flex">
        <div className=" flex-col px-1 w-full md:w-1/2">
          <p className={styles.title}>
           {comments.username}
          </p>
          <div className=" w-full h-full flex-col flex-wrap ">
            {comments.length ?
              comments.map(comment => (
                comment.isAccept && <Comment  key={comment._id}  {...comment}  />
              )) : <p>شما میتوانید اولین نظر را در مورد این محصول بنویسید.</p>
            }
          </div>
        </div>
        <div className=" flex w-full px-1 md:w-1/2">
          <CommentForm  productID={productID}/>
        </div>
      </main>
    </div>
  );
};

export default Comments;
