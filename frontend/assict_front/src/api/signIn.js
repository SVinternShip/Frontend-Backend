//로그인

import axios from "axios";

export default async function signIn() {
  try {
    //응답 성공
    const response = await axios.post('/api/user/login',{
      	//보내고자 하는 데이터
    });
    console.log(response);
  } catch (error) {
    //응답 실패
    console.error(error);
  }
}
