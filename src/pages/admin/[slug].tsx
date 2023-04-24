import styles from '../../styles/Admin.module.css'
import AuthCheck from "@/components/AuthCheck";
import Metatags from "@/components/Metatags";
import { auth, firestore, serverTimestamp } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkDown from "react-markdown";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
        <Metatags title="admin page" description="description" image="" />
        <PostManager />
    </AuthCheck>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const {slug} = router.query;

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  const [post] = useDocumentData(postRef);

  console.log(post);

  return(
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID : {post.slug}</p>

            <PostForm postRef={postRef} defaultValues={post} preview={preview} />

            <aside>
              <h3>Outils</h3>
              <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
              <Link href={`/${post.username}/${post.slug}`}>
                <button className="btn-blue">Live view</button>
              </Link>
            </aside>
          </section>
        </>
      )}
    </main>

  )
}

function PostForm({defaultValues, postRef, preview}){
  const {register, handleSubmit, reset, watch, formState: {errors, isValid, isDirty}} = useForm({defaultValues, mode: 'onChange'})
  // const {isValid, isDirty} = formState;

  const updatePost = async ({content, published}) => {
    console.log(content);
    console.log(published);
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    })

    reset({content, published});
    
    toast.success('Post édité avec succès')
  }
  return(
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkDown>{watch(`content`)}</ReactMarkDown>
        </div>
      )}
      <div className={preview ? styles.hidden : styles.controls}>
        <textarea name="content" {...register("content",{
          maxLength: {value: 2000, message: 'contenu trop long'},
          minLength: {value: 10, message: 'contenu trop court'},
          required: {value: true, message: 'contenu requis'}
        })}></textarea>
        {errors.content && <p className='text-danger'>{errors.content.message}</p>}
        <fieldset>
          <input className={styles.checkbox} name="published" type="checkbox" {...register("published")}/>
          <label>Publié</label>
        </fieldset>

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Sauvegarder
        </button>
      </div>
    </form>
  )
}