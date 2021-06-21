import React, { useState } from 'react';
import {Modal,Form,Select,Input,Upload, message} from 'antd';
import './viewModel.less'
import lodash from 'lodash';
import {moneyAdoptApi,moneyRejectApi} from '@/services/moneyaudit'
import {fileApi} from '@/services/common';
import { UploadFile } from 'antd/lib/upload/interface';
type ViewModelType={
    isModalVisible?:boolean,
    // handleOk?:(e: React.MouseEvent<HTMLElement>) => void,
    handleCancel?:Function,
    info?:object[],
    reloadListFunc:Function

}
//
type UploadType=UploadFile<object>[];
export default (props:ViewModelType)=>{
    const {isModalVisible,handleCancel,info,reloadListFunc}=props;
    const [form]=Form.useForm();
    const modelType=lodash.get(info,'modelType','')
    console.log(info,'info');
    
    const [fileList, setFileList] = useState<UploadType>([
      ]);
    return(
        <Modal 
        destroyOnClose={true}
        key={lodash.get(info,'id','1')}
        title={lodash.get(info,'modelType','')} visible={isModalVisible} onOk={onOk} 
            onCancel={()=>{handleCancel&&handleCancel()
                form.resetFields()
                setFileList([])
            }
        } 
        width="500px">
            <Form onFinish={onFinish} form={form} initialValues={info}         
            key={"form"+lodash.get(info,'id','1')}>
                {modelType==="驳回"&&getRejectDom()}
                {modelType==="审核"&&getAdoptDom(fileList,setFileList)}
            </Form>
        </Modal>
    )
    function onOk(){
       form.submit()
       
    }
    function onFinish(values:object){
        console.log(values,'onFinish',fileList);
        const modelType=lodash.get(info,'modelType','')
        const fetchUrl=modelType==="驳回"?moneyRejectApi:moneyAdoptApi
        fetchUrl({...values,id:lodash.get(info,'id','1')}).then(()=>{
            message.success(modelType+"成功")
            handleCancel&&handleCancel()
            reloadListFunc()
        }).catch(()=>{
            message.error(modelType+"出错")
        })
    }
    function getRejectDom(){
        return(
            <Form.Item label="驳回原因" required name=""
            rules={[{ required: true, message: '请填写驳回原因' }]}>
                <Input.TextArea />
            </Form.Item>
        )
    }
    function getAdoptDom(fileList:UploadType,setFileList:Function){
        return(
            <>
                <Form.Item label="收款流水号" required name="receiveTransferNo"
                rules={[{ required: true, message: '填写收款流水号' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="确定打款金额" required name="confirmPayAmount"
                rules={[{ required: true, message: '填写打款金额!' }]}>
                    <Input type="number" min={0} suffix="元"/>
                </Form.Item>
                <Form.Item label="上传收款凭证" required name="voucherImageUrl"
                rules={[{ required: true, message: '上传收款凭证' }]}>
                    <Upload 
                    showUploadList={{
                        showPreviewIcon:false,
                    }}
                    customRequest={()=>false}
                    beforeUpload={beforeUpload}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({file,fileList}) => {
               
                        if(file.status==='removed'){
                            setFileList(fileList)
                        }
                    }}
                    >
                       {fileList.length < 1 && '+ Upload'}
                    </Upload>
                </Form.Item>
            </>
        )
        async function beforeUpload(file:{name:string}&Blob){
            let filedata = new FormData();
            filedata.append('file', file);
            filedata.append('filename',file.name);
            filedata.append('uploadBussinessType',"1");
            

            const res = await fileApi(filedata)
            console.log(file,'filedata',res);
            if(res.status===0){
                const lastcurrentimgUrl =await  fileList.length > 0 
                ? fileList[fileList.length - 1] : {uid: '1'};
                const resData = await{ uid: lastcurrentimgUrl.uid + 1, name: file.name, url: res.data };
                const newcurrentimgUrl = [...fileList,resData ]
                setFileList(newcurrentimgUrl)
            }

        }
    }
 

}