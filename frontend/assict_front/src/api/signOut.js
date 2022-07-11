//로그아웃

import axios from "axios";

export default async function signOut() {
  try {
    //응답 성공
    const response = await axios.post('/api/user/logout',{
      	//보내고자 하는 데이터
    });
    console.log(response);
  } catch (error) {
    //응답 실패
    console.error(error);
  }
}