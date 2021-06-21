import {Card,Table} from 'antd';

type RegistationAuditType={
  recordsList:any
}
const RegistationAudit=(props:RegistationAuditType)=>{
    const {recordsList}=props;
    return(
        <Card title="商户注册审核记录"  style={{ width: "100%" }}>
                    {getRegistryList(recordsList)}
        </Card>
    )
    function getRegistryList(recordsList:any) {
        const dataSource = [
            // {
            //     id: '1',
            //     operatorName:'胡彦斌',
            //     operation: '审核驳回',
            //     remark: '餐饮喝水',
            //     operatorTime: '2021-06-17',
            // },
            // {
            //     id: '2',
            //     operatorName:'胡彦斌',
            //     operation: '撤回审核',
            //     remark: '餐饮喝水',
            //     operatorTime: '2021-06-17',
            //   },
            // {
            //     id: '3',
            //     operatorName:'胡彦斌',
            //     operation: '审核通过',
            //     remark: '----',
            //     operatorTime: '2021-06-17',
            // },
            
        ].concat(recordsList);
        const columns = [
            {
              title: '操作人',
              dataIndex: 'operatorName',
              key: 'operatorName',
            },
            {
              title: '操作',
              dataIndex: 'operation',
              key: 'operation',
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
            },
            {
              title: '操作时间',
              dataIndex: 'operatorTime',
              key: 'operatorTime',
            },
          ];
        return(
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        )
    }
}
export default RegistationAudit;