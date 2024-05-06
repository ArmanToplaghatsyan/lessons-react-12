import React, { useEffect, useState } from 'react';
import { getData } from '../../firebase/firestore';
import { IPost, MyCollection } from '../../type/type';
import { Link } from 'react-router-dom';

export const Posts: React.FC = React.memo((): JSX.Element => {
  const [post, setPost] = useState<IPost[]>([]);

  useEffect(() => {
    getData<IPost>(MyCollection.POST)
      .then((res) => {
        setPost(res);
      })
      .catch(console.warn);
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <table>
       <thead>
            <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Img</th>
                <th>See More</th>
            </tr>
        </thead> 
        <tbody>
            {
                post.map((elm) => {
                    return(<tr key={elm.id}>
                        <td>{elm.title}</td>
                        <td>{elm.body}</td>
                        <td><img src={elm.img} width={150}height={100}/></td>
                        <td><Link to={'details/'+elm.id}>Go</Link></td>
                    </tr>)
                })
            }
        
        </tbody>
      </table>

    </div>
  );
});
