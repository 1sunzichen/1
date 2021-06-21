/*
 * @Author: 孙家奇 
 * @Date: 2021-06-19 15:44:46 
 * @Last Modified by: 孙家奇
 * @Last Modified time: 2021-06-20 14:33:07
 */

import request,{commonHeaders} from "@/utils/request";
import {FILE_API}  from '@/config/index'

/* 
  商户注册审核-分页条件查询商户列表
  http://yapi.bingex.com/project/997/interface/api/89695
*/
export async function fileApi(params:any) {
    // console.log(getDvaApp()._models,'models');uploadSingleFile
    //uploadMerchantFile
    return request(FILE_API+'/file/upload/uploadMerchantFile', {
      method: 'POST',
      data: params,
      requestType: 'form',
    //   headers:{"Content-Type":"multipart/form-data"}
    });
}


