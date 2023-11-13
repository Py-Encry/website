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

export async function signup(email: string, username : String, password: string, confirmPassword : String, setFail: any, setValue: any, setUserInfo: any) {
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
    let {token,  ...info} = json
    setValue(token)
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
