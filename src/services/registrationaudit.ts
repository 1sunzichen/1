/*
 * @Author: 孙家奇 
 * @Date: 2021-06-19 10:44:24 
 * @Last Modified by: 孙家奇
 * @Last Modified time: 2021-06-20 14:34:51
 */
import request,{commonHeaders} from "@/utils/request";
import {API} from '@/config/index'
// import {getDvaApp} from 'umi'
type MerchantAuditDetailType={
    merchantId:string
}
type MerchantAuditAdoptType={
  merchantId:number
}
type MerchantRejectType={
  merchantId:number,
  remark:string
}
// const commonHeaders={'Content-Type': 'application/json',"clientId":"web","token":JSON.parse(sessionStorage.getItem("user")||"{'token':''}").token}

/* 
  商户注册审核-分页条件查询商户列表
  http://yapi.bingex.com/project/997/interface/api/89695
*/
export async function merchantListApi(params:any) {
    // console.log(getDvaApp()._models,'models');
    return request(API+'/merchantAudit/getList', {
      method: 'POST',
      data: params,
      headers:commonHeaders()
    });
}
/* 
  商户注册审核-查看商户详情
  http://yapi.bingex.com/project/997/interface/api/89751
*/
export async function merchantDetailApi(params: MerchantAuditDetailType) {
    // console.log(getDvaApp()._models,'models');
    return request(API+'/merchantAudit/detail', {
      method: 'POST',
      data: params,
      headers:commonHeaders()
    });
}
/* 
  商户注册审核-审核通过接口
  http://yapi.bingex.com/project/997/interface/api/89737 
*/

export async function merchantAdoptApi(params: MerchantAuditAdoptType) {
  // console.log(getDvaApp()._models,'models');
  return request(API+'/merchantAudit/adopt', {
    method: 'POST',
    data: params,
    headers:commonHeaders()
  });
}

/* 
  商户注册审核-审核通过接口
  http://yapi.bingex.com/project/997/interface/api/89737 
*/

export async function merchantRejectApi(params: MerchantRejectType) {
  // console.log(getDvaApp()._models,'models');
  return request(API+'/merchantAudit/reject', {
    method: 'POST',
    data: params,
    headers:commonHeaders()
  });
}