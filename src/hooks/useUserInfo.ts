import { useState, useEffect } from 'react';
import UserInfo from '../models/userInfo';

function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo');

    if (userInfoStr) setUserInfo(JSON.parse(userInfoStr));
  }, []);

  return userInfo;
}

export default useUserInfo;