import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataById } from '../../firebase/firestore';
import { IPost, MyCollection } from '../../type/type';

export const DetailsPosts: React.FC = React.memo((): JSX.Element => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>({} as IPost);

  useEffect(() => {
    if (id)
      getDataById<IPost>(MyCollection.POST, id)
        .then((res) => {
          console.log(res);
          setPost(res);
        })
        .catch(console.warn);
  }, [id]);

  return (
    <div>
      <h2>Posts Details </h2>
      <h1>{post.title}</h1>
      <img src={post.img} width={150} height={100}></img>
      <p>{post.body}</p>
    </div>
  );
});
