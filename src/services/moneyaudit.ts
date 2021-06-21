/*
 * @Author: 孙家奇 
 * @Date: 2021-06-19 10:44:24 
 * @Last Modified by: 孙家奇
 * @Last Modified time: 2021-06-20 14:33:36
 */
import request,{commonHeaders} from "@/utils/request";
import {API}  from '@/config/index'

/* 
  商户打款审核-分页条件查询商户列表
  http://yapi.bingex.com/project/997/interface/api/89695
*/
export async function moneyListApi(params:any) {
    // console.log(getDvaApp()._models,'models');
    return request('/ystest/paymentAudit/listPayment', {
      method: 'POST',
      data: params,
      headers:commonHeaders()
    });
}

/* 
  商户打款审核-驳回
  http://yapi.bingex.com/project/997/interface/api/89695
*/
export async function moneyRejectApi(params:any) {
    // console.log(getDvaApp()._models,'models');
    return request(API+'/paymentAudit/reject', {
      method: 'POST',
      data: params,
      headers:commonHeaders()
    });
}
/* 
  商户打款审核-通过
  http://yapi.bingex.com/project/997/interface/api/89695
*/
export async function moneyAdoptApi(params:any) {
    // console.log(getDvaApp()._models,'models');
    return request(API+'/paymentAudit/adopt', {
      method: 'POST',
      data: params,
      headers:commonHeaders()
    });
}
