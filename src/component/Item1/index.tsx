import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';

export const Item1: React.FC = React.memo((): JSX.Element => {
  const [img, setImg] = useState<any>(null);
  const upload = (): void => {
    if(img){
        const storageRef = ref(storage, 'post/'+img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on("state_changed",
        ()=> {console.log('pending')},
        ()=> {console.log('rejesct')},
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then(link => {console.log(link)}
            );
            })

    }else{
        alert('Chose the image')
    }
  };

  return (
    <div>
      <h2>Item1</h2>
      <input
        type="file"
        onChange={(e: any) => {
          // console.log(e.target.files);
          if (e.target.files.length) {
            setImg(e.target.files[0]);
          }
        }}
      />
      <br />
      <button onClick={upload}>Upload</button>
    </div>
  );
});


// https://firebase.google.com/docs/storage/web/upload-files