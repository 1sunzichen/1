import request from '@/utils/request';
import {API}  from '@/config/index'
export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};
export type YSLoginParamsType={
  userName: string;
  password: string;
}
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
//{ headers: { 'Content-Type': 'multipart/form-data'}
export async function getAccountLogin(params: YSLoginParamsType) {
  console.log(params,'params');
  
  const {userName,password}=params;
  return request(API+'/user/login', {
    method: 'POST',
    data: {loginNo:userName,password},
    headers: { 'Content-Type': 'application/json','clientId':"web"}
  });
}
export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
