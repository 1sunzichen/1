import React, { useRef,useState } from 'react';
import { Button,Row,Form,Input} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import {merchantListApi,merchantDetailApi} from '@/services/registrationaudit'
import ViewModel,{rowInfoType} from './viewModel';
import lodash from 'lodash';
import AdvancedSearch from './search';
import './index.less';
//定义后台的返回字段

export const productTypeDict=['餐饮', '文件', '蛋糕', '鲜花', '零食', '其他', '生鲜', '数码', '商超']
export const auditStatus=['待审核','审核驳回','审核通过'];
type ListItem = {
  id: number;
};
type searchType={
  auditStatus:number,
  pageSize:number,
  current:number,
  pageNumber:number,
  stateTime?:string[],
  auditTimeBeginDt?:string,
  auditTimeEndDt?:string,
  submitAuditTimeBeginDt?:string,
  submitAuditTimeEndDt?:string,
  optionTime?:string[],
}

const getColumns=(viewFunc:Function)=>{

const columns: ProColumns<ListItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '下单时间',
    dataIndex: 'stateTime',
    hideInTable:true,
    valueType: 'dateTimeRange',
  },
  {
    title: '操作时间',
    dataIndex: 'optionTime',
    hideInTable:true,
    valueType: 'dateTimeRange',
  },
  {
    title: '商户ID',
    dataIndex: 'id',
    // hideInTable:true,
  },
  {
    title: '开通手机号',
    dataIndex: 'phone',
    // hideInTable:true,
    fieldProps:{
      placeholder:"开通手机号/商户管理员手机号"
    }
  },
  {
    title: '品牌名称',
    dataIndex: 'merchantName',
    // hideInTable:true,
  },
  {
    title: '老板姓名',
    dataIndex: 'bossName',
    // hideInTable:true,
  },
  {
    title: '产品类型',
    dataIndex: 'state',
    hideInSearch:true,
    valueType: 'select',
    valueEnum:new Map(productTypeDict.map( (value,key) => [key,value])),
  },
  {
    title: '所在城市',
    dataIndex: 'city',
    hideInSearch:true,

  },
  {
    title: '门店地址',
    dataIndex: 'storeAddress',
    hideInSearch:true,

  },
  {
    title: '门牌号码',
    dataIndex: 'houseNumber',
    hideInSearch:true,

  },
  {
    title: '提交审核时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    valueType: 'date',
    // sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, index, action) => [

      <Button onClick={()=>{viewFunc(record)}} key={'option'+index}>
        查看
      </Button>,
    ],
  },
];
  return columns;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [activekey, setActiveKey] = useState<React.Key>("0");
  const [visible,setVisible]=useState<boolean>(false);
  const [rowInfo,setRowInfo]=useState<rowInfoType>({merchant:{},recordsList:[],storeList:[]})
  function cancel():void {
    setVisible(false)
  }
  
  return (
    <>
    <AdvancedSearch/>
    <ProCard layout="center" bordered title={
      <>
        <div style={{fontWeight:"normal"}}>
          <span style={{fontSize:18,padding:4}}>YD202104131029</span>
          <span style={{padding:30,fontSize:14,color:"#00000073"}}>2021.04.13 10:29</span>
        </div>
        <div>
          <span style={{fontSize:15,padding:4}}>三方订单号:</span>
          <span style={{padding:30,}}>3098830948</span>
        </div>
        <div style={{color:"#00000073"}}>
          <span style={{fontSize:15,padding:4}}>备注:</span>
          <span style={{padding:30,}}>小心轻放</span>
        </div>
      </>

    }
        headerBordered
        style={{padding:0}}
        className="procardStyle"
        extra={
          <>
            <div style={{fontWeight:"normal"}}>
              <Button style={{borderRadius:10}}>配送中</Button>
              <span style={{fontSize:18,padding:4}}>鲜花/北京/1.5公里/5公斤之内/19.2元</span>
              
            </div>
            <div>
              <span style={{fontSize:15,padding:4}}>门店名称:xxx</span>
              <span style={{fontSize:15,padding:4}}>下单人名称:xxx</span>
              <span style={{fontSize:15,padding:4}}>下单手机号:152xxx87668</span>
            </div>
          </>
        }
        // subTitle="副标题"
        >
        <Form style={{width:"100%"}} layout="inline"
          initialValues={{platform:"达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达达"}}
        >
       
          <ProCard title="" style={{width:"33%"}} bordered>
              <Form.Item label="配送平台" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="配送三方单号" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="配送员" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="配送电话" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
          </ProCard>
          <ProCard title="" bordered style={{width:"33%"}}  >
              <Form.Item label="寄件人" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="寄件电话" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="寄件地址" name="platform">
                  <Input.TextArea bordered={false} readOnly/>
              </Form.Item>
          </ProCard>
          <ProCard title="" style={{width:"33%"}}   bordered>
              <Form.Item label="收件人" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="收件电话" name="platform">
                  <Input bordered={false} readOnly/>
              </Form.Item>
              <Form.Item label="收件地址" name="platform">
                  <Input.TextArea bordered={false} readOnly/>
              </Form.Item>
          </ProCard>
        </Form>
    </ProCard>
    <ViewModel isModalVisible={visible} handleCancel={cancel} rowInfo={rowInfo} setVisible={setVisible} reloadListFunc={reloadListFunc}/>
    </>
  );




  function reloadListFunc(){
    actionRef.current?.reload()
  }
};
