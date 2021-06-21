import React, { useState } from 'react';
import {Modal,Form,Select,message} from 'antd';
import './viewModel.less'
import MerchantInfo,{MerchantInfoType}from './component/MerchantInfo'
import RegistationAudit from './component/RegistrationAudit';
import StoresInformation from './component/StoresInformation';
import {merchantRejectApi} from '@/services/registrationaudit'
import lodash from 'lodash';

const {Option}=Select;
export type rowInfoType={
    merchant:MerchantInfoType,
    recordsList:[],
    storeList:[],
}
export type ViewModelType={
    reloadListFunc?:Function,
    isModalVisible?:boolean,
    setVisible?:React.Dispatch<React.SetStateAction<boolean>>,    
    handleOk?:(e: React.MouseEvent<HTMLElement>) => void,
    handleCancel?:(e: React.MouseEvent<HTMLElement>) => void,
    rowInfo:rowInfoType
}

export default (props:ViewModelType)=>{
    const {isModalVisible,handleOk,handleCancel,rowInfo,setVisible,reloadListFunc}=props;
    const {merchant,recordsList=[],storeList=[]}=rowInfo;
    const [notPass,setNotPass]=useState<boolean>(false)
    const [form] = Form.useForm();
    return(
        <Modal title="查看信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width="100%"
        destroyOnClose={true}
        footer={null}>
                <MerchantInfo setNotPass={setNotPass} info={merchant} setVisible={setVisible} reloadListFunc={reloadListFunc}/>
                <div style={{height:"30px"}}/>
                <RegistationAudit recordsList={recordsList}/>
                <StoresInformation storeList={storeList}/>
                <Modal visible={notPass} onOk={()=>{
                        // console.log(form.getFieldsValue(),'getFieldsValue');
                        const {why}=form.getFieldsValue()
                        rejectFunc(why)}
                    } onCancel={()=>setNotPass(false)}title="审核驳回">
                    <Form form={form}>
                        <Form.Item label="备注驳回原因" name="why">
                            <Select>
                                <Option key="1" value="图片不清晰">图片不清晰</Option>
                                <Option key="2" value="资料不规范">资料不规范</Option>
                                <Option key="3" value="资料漏缺">资料漏缺</Option>
                                <Option key="4" value="身份证姓名与执照法定代表人不符">身份证姓名与执照法定代表人不符</Option>
                                <Option key="5" value="执照名称与店铺名头不符">执照名称与店铺名头不符</Option>
                                <Option key="6" value="其他">其他</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            
        </Modal>
    )

    function rejectFunc(remark:string){
        merchantRejectApi({merchantId:lodash.get(merchant,'id',0),remark}).then((res)=>{
            message.success("驳回成功")
            setNotPass&&setNotPass(false)
            setVisible&&setVisible(false)
            reloadListFunc&&reloadListFunc()
        }).catch(()=>{
            message.error("驳回出错")
        })
    }

 

}