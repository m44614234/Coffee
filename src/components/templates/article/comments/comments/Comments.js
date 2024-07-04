import styles from './comments.module.css'
import Form from '../form/Form';
import Comment from '../comment/Comment';

const Comments = ({blogComments , blogID , commentUser}) => {

 
    return (
        <div>
            <p className='text-2xl w-1/2' dir='rtl'>نظرات<strong> : ({blogComments?.length}) </strong> </p>
            <hr />

            <main className={styles.comments}>
                <div className={styles.user_comments}>
                    <div>

                        {blogComments.length === 0 && 
                        <p className='text-2xl text-green-900 text-center p-4 mt-6'>هنوز کامنتی برای این مقاله ثبت نشده است</p>}
                        {blogComments.map((comment , i) =>
                         <Comment 
                        key={comment?._id} 
                        commentEmail={comment?.email}
                        comentDate ={comment?.createdAt}
                        commentBody={comment?.body}
                        commentImage = {comment?.blog?.img}
                         />)}

                        
                    </div>
                </div>
                <div className={styles.form_bg}>

                         <Form 
                        key={commentUser} 
                        blogID={blogID}
                        commentUser={commentUser}
                        />
                </div>
            </main>

        </div>
    )
}

export default Comments
