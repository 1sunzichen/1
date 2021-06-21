import React, { useRef,useState } from 'react';
import { Button} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {moneyListApi} from '@/services/moneyaudit'
import ViewModel from './viewModel';
import lodash from 'lodash';
import {AuditType} from '@/pages/Common/config';

//定义后台的返回字段
//



const productTypeDict=['餐饮', '文件', '蛋糕', '鲜花', '零食', '其他', '生鲜', '数码', '商超']

type ListItem = {
  id: number;
};
type searchTypeInter={
  auditStatus?:number,
  pageSize?:number,
  current?:number,
  pageNumber?:number,
  stateTime?:string[],
  auditTimeBeginDt?:string,
  auditTimeEndDt?:string,
  submitAuditTimeBeginDt?:string,
  submitAuditTimeEndDt?:string,
  optionTime?:string[],
  status?:React.Key
}
type searchType=Partial<searchTypeInter>

const getColumns=(viewFunc:Function,activekey:React.Key)=>{

const columns: ProColumns<ListItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },

  {
    title: '付款方开户行名称',
    dataIndex: 'stateTime',
    // hideInTable:true,
    hideInSearch:true,
    // valueType: 'image',
  },
  {
    title: '打款金额',
    dataIndex: 'stateTime',
    // hideInTable:true,
    hideInSearch:true,
    // valueType: 'image',
  },
  {
    title: '打款时间',
    dataIndex: 'stateTime',
    // hideInTable:true,
    hideInSearch:true,
    valueType: 'date',
  },
  {
    title: '付款凭证',
    dataIndex: 'stateTime',
    // hideInTable:true,
    hideInSearch:true,
    valueType: 'image',
  },
  {
    title: '申请时间',
    dataIndex: 'stateTime',
    // hideInTable:true,
    valueType: 'dateTimeRange',
  },
  {
    title: '状态',
    dataIndex: 'optionTime',
    // hideInTable:true,
    valueType: 'select',
    valueEnum:new Map(productTypeDict.map( (value,key) => [key,value])),
  },
  {
    title: '手机号',
    dataIndex: 'id',
    hideInTable:true,
    // hideInTable:true,
  },
  {
    title: '付款方姓名',
    dataIndex: 'phone',
    hideInTable:true,
    fieldProps:{
      placeholder:"付款方开户行姓名"
    }
  },
  {
    title: '商户id',
    dataIndex: 'merchantName',
    // hideInTable:true,
    fieldProps:{
      placeholder:"充值到商户id"
    }
  },
  {
    title: '商户名称',
    dataIndex: 'bossName',
    // hideInTable:true,
    fieldProps:{
      placeholder:"充值到易送商户名"
    }
  },
  {
    title: '商户管理员手机号',
    dataIndex: 'state',
    hideInSearch:true,
  },
  {
    title: '收款方流水号',
    dataIndex: 'state',
    hideInSearch:true,
  },
  {
    title: '收款凭证',
    dataIndex: 'state',
    hideInSearch:true,
    valueType: 'image',
  },
  {
    title: '门牌号码',
    dataIndex: 'houseNumber',
    hideInSearch:true,

  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, index, action) => {
      return String(AuditType["待审核"])===activekey&&[
        <Button onClick={()=>{viewFunc({...record,modelType:"审核"})}} key={'option'+index}>
          审核通过
        </Button>,
        <Button onClick={()=>{viewFunc({...record,modelType:"驳回"})}} key={'option'+index}>
          驳回
        </Button>,
    ]},
  },
];
  return columns;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [activekey, setActiveKey] = useState<React.Key>("0");
  const [visible,setVisible]=useState<boolean>(false);
  const [rowInfo,setRowInfo]=useState<object[]>([])
  function cancel() {
    setVisible(false)
  }
  
  return (
    <>
    <ProTable
      key={"ProTable888"}
      columns={getColumns(viewFunc,activekey)}
      params={{status:Number(activekey)}}
      beforeSearchSubmit={(item:searchType)=>{
         return convertSearchFn(item)
      }}
      actionRef={actionRef}
      request={(params, sort, filter) => moneyListApi(lodash.omit(params,['current']))
        .then((res)=>{
          const result={
            data:res.data.content||[{remark:"1"}],
            total:res.data.total
          }
          return result
        })
      }
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      toolbar={{menu: {
        type: 'tab',
        activeKey: activekey,
        items:[
          {
            key: "0",
            label: <span>待审核</span>,
          },
          {
            key: "2",
            label: <span>审核驳回</span>,
          },
          {
            key: "1",
            label: <span>审核通过</span>,
          },
          {
            key: "3",
            label: <span>充值成功</span>,
          },
          {
            key: "4",
            label: <span>充值失败</span>,
          },
        ],
        onChange: (key) => {
          setActiveKey(key as string);
        },
      },}
    }

    />
    
      <ViewModel isModalVisible={visible} handleCancel={cancel} info={rowInfo} reloadListFunc={reloadListFunc}/>

    </>
  );

  async function viewFunc(record:[]){

    setRowInfo(record)
    setVisible(true)
  }
  function timeConvert(arr:string[],num:number){
    const reg=/\s|-|:/g;

    return arr[num].replace(reg,"");
  }
  function convertSearchFn(params:searchType):unknown {
    let voidParams=lodash.omit(params,['stateTime','optionTime','current'])

    if(params.stateTime){
      console.log(params.stateTime,'stateTime');
      voidParams.auditTimeBeginDt=timeConvert(params.stateTime,0);
      voidParams.auditTimeEndDt=timeConvert(params.stateTime,1);
    }
    if(params.optionTime){

      voidParams.submitAuditTimeBeginDt=timeConvert(params.optionTime,0);;
      voidParams.submitAuditTimeEndDt=timeConvert(params.optionTime,1);;
    }
    return {...voidParams,pageNumber:params.current};
  }
  function reloadListFunc(){
    actionRef.current?.reload()
  }
};
