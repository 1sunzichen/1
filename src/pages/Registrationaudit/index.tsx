import React, { useRef,useState } from 'react';
import { Button} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {merchantListApi,merchantDetailApi} from '@/services/registrationaudit'
import ViewModel,{rowInfoType} from './viewModel';
import lodash from 'lodash';
//定义后台的返回字段

export const productTypeDict=['餐饮', '文件', '蛋糕', '鲜花', '零食', '其他', '生鲜', '数码', '商超']
export const auditStatus=['待审核','审核驳回','审核通过'];
type ListItem = {
  id: number;
};
interface searchTypeInter{
  auditStatus?:React.Key,
  pageSize?:number,
  current?:number,
  pageNumber?:number,
  stateTime?:string[],
  auditTimeBeginDt?:string,
  auditTimeEndDt?:string,
  submitAuditTimeBeginDt?:string,
  submitAuditTimeEndDt?:string,
  optionTime?:string[],
}
type searchType=Partial<searchTypeInter>
const getColumns=(viewFunc:Function)=>{

const columns: ProColumns<ListItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '提交时间',
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
    <ProTable
      columns={getColumns(viewFunc)}
      params={{auditStatus:activekey}}
      beforeSearchSubmit={(item:searchType)=>{
         return convertSearchFn(item)
      }}
      actionRef={actionRef}
      request={(params, sort, filter) => merchantListApi(lodash.omit(params,['current']))
        .then((res)=>{
          const result={
            data:res.data.content,
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
        items: [
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
        ],
        
        onChange: (key) => {
          setActiveKey(key as string);
        },
      },}
    }

    />
    <ViewModel isModalVisible={visible} handleCancel={cancel} rowInfo={rowInfo} setVisible={setVisible} reloadListFunc={reloadListFunc}/>
    </>
  );

  async function viewFunc(record:ListItem){
    const result=await merchantDetailApi({merchantId:String(record.id)})
    // setRowInfo
    const {data={}}=result;
    console.log(data,'data');
    setRowInfo(data)
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
