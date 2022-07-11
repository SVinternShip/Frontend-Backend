//회원가입

import axios from "axios";

export default async function signUp() {
  try {
    //응답 성공
    const response = await axios.post('/api/user/signup',{
      	//보내고자 하는 데이터
    });
    console.log(response);
  } catch (error) {
    //응답 실패
    console.error(error);
  }
}
