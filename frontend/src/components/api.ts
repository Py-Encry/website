import { FileWithPath } from '@mantine/dropzone';
import { Dispatch, SetStateAction } from 'react';
import { useAtom } from 'jotai';
import { useLocalStorage } from '@mantine/hooks';
import { userInfoAtom } from '../App';

interface ApiData {
  key: number;
  mode: string;
  method: string;
  message: string | null;
}

export async function encryptApiData(data: ApiData, image: FileWithPath[], setFail: Dispatch<SetStateAction<boolean>>) {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const base64Image = e.target?.result;

    try {
      const response = await fetch('http://127.0.0.1:8000/encrypt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          base64Image,
        }),
      });
      const json = await response.json();
    } catch (error) {
      setFail(true);
      console.log(error);
    }
  };

  await reader.readAsDataURL(image[0]);
}

export async function Signup(email: string, username : String, password: string, confirmPassword : String, setFail: any, setValue: any, setUserInfo: any) {
  console.log("hi")
  try {
    const response = await fetch('http://127.0.0.1:8000/encrypt/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    const json = await response.json();
    let {token,  ...info} = json
    setValue(token)
    setUserInfo(info)
    window.location.href = "/";
  } catch (error) {
    setFail(true);
    console.log(error);
  }
}

export async function Login(username: string, password: string, setFail: any, setValue: any, setUserInfo: any) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await response.json();
    let {token, image,  ...info} = json
    setValue(token)
    const base64WithoutPrefix = image.replace(/^data:image\/[a-z]+;base64,/, '');

    // Decode base64 string
    const decodedArray = Uint8Array.from(atob(base64WithoutPrefix), (c) => c.charCodeAt(0));

    // Create a blob from the Uint8Array
    const blob = new Blob([decodedArray], { type: 'image/png' }); // Adjust the MIME type accordingly

    // Create a data URL from the blob
    const dataUrl = URL.createObjectURL(blob);
    console.log(dataUrl)
    info.image = dataUrl
    setUserInfo(info)
    window.location.href = "/";
  } catch (error) {
    setFail(true);
    console.log(error);
  }
}

export async function ChangeEmailAPI(newEmail: string, token: string, password: string, username: string, setUserInfo: any, setValue: any) {
  try {
    const response = await fetch('http://127.0.0.1:8000/change_email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newEmail,
        token,
        password,
        username
      }),
    });
    const json = await response.json();
    setValue(null)
    setUserInfo({ username: null, email: null });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export async function ChangePasswordAPI(password: string, token: string, newPassword: string, username: string, setUserInfo: any, setValue: any) {
  try {
    const response = await fetch('http://127.0.0.1:8000/change_password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword,
        token,
        password,
        username
      }),
    });
    const json = await response.json();
    setValue(null)
    setUserInfo({ username: null, email: null });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export async function UploadProfilePicture(inputImage: File | null, token: string, setUserInfo: any, userInfo: any) {
  const reader = new FileReader();
  console.log("Hi")

  reader.onload = async (e) => {
    const image = e.target?.result;

    try {
      const response = await fetch('http://127.0.0.1:8000/upload_image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          image,
        }),
      });
      const json = await response.json();
      if (inputImage) {
        const dataUrl = URL.createObjectURL(inputImage);
        setUserInfo({ ...userInfo, image: dataUrl });

      }
      console.log("Hi")
    } catch (error) {
      //setFail(true);
      console.log(error);
    }
  }
  if (inputImage) {
    console.log("Bye2")
    await reader.readAsDataURL(inputImage);
  }else{
    console.log("Bye")
  }
}

export async function GetProfilePicture(token: string, userInfo: any) {
  try {
    const response = await fetch('http://127.0.0.1:8000/user-profiles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        ...userInfo
      }),
    });
    const json = await response.json();
    console.log(json)
  } catch (error) {
    //setFail(true);
    console.log(error);
  }
}
