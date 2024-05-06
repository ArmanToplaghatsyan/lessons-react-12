import React from 'react';
import { useForm } from 'react-hook-form';
import { IPost, MyCollection } from '../../type/type';
import { storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addData } from '../../firebase/firestore';

export const AddPost: React.FC = React.memo((): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPost>();
  const save = (data: IPost): void => {
    console.log(data);

    const img = data.file[0];
    const storageRef = ref(storage, 'show/' + Date.now() + img.name);
    const upload = uploadBytesResumable(storageRef, img);
    upload.on(
      'state_changed',
      () => {
        console.log('pending');
      },
      () => {
        console.log('reject');
      },
      () => {
        getDownloadURL(upload.snapshot.ref)
          .then((res) => {
            console.log(res);
            addData<IPost>(MyCollection.POST, {
              title: data.title,
              body: data.body,
              img: res,
            })
              .then(console.log)
              .catch(console.warn);
          })
          .catch(console.warn);
      },
    );
  };

  return (
    <div>
      <h2>AddPost</h2>
      <form onSubmit={handleSubmit(save)}>
        <br />
        <label>Title</label>
        <br />
        <input
          {...register('title', { required: 'enter title' })}
          placeholder="title"
        ></input>
        {errors.title && <p>{errors.title.message}</p>}
        <br />
        <label>Body</label>
        <br />
        <input
          {...register('body', { required: 'enter body' })}
          placeholder="body"
        ></input>
        {errors.body && <p>{errors.body.message}</p>}
        <br />
        <label>Img</label>
        <br />
        <input
          type="file"
          {...register('file', { required: 'enter file' })}
          placeholder="file"
        ></input>
        <br />
        <button>Save</button>
      </form>
    </div>
  );
});
