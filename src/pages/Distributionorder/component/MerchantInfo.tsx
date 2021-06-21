import {Button,Card,Form,Input,Row,Col,Table,Image,Space, message} from 'antd';
import {auditStatus} from '../index';
import {connect} from 'umi';
import {merchantAdoptApi} from '@/services/registrationaudit'
import type { ConnectState } from '@/models/connect';
import {AuditType} from '@/pages/Common/config';
import lodash from 'lodash'
// const mockInfo={
//     merchantName:"刘闪送",
//     merchantId:111,
//     merchantState:"未审核",
//     merchantCode:"00001"
// }
export type MerchantInfoType={
    id?:number,
    auditStatus?:number,
    bossName?:string,
    createTime?:number,
}
type MerchantPropsType={
    setNotPass:Function,
    info?:MerchantInfoType,
    userModel:any,
    setVisible?:React.Dispatch<React.SetStateAction<boolean>>,   
    reloadListFunc?:Function 
}

const MerchantInfo=(props:MerchantPropsType)=>{
    const {setNotPass,info,userModel = {},setVisible,reloadListFunc}=props;
    console.log(info,'MerchantInfo');
    
    const infoDict={merchantId:lodash.get(info,'id',0),...userModel,merchantState:auditStatus[lodash.get(info,'auditStatus',0)]}
    return(
        <Card title="商户信息" extra={getExtra(infoDict)} style={{ width: "100%" }}>
        {getTable({...info,...userModel})}
        {getOptionButtons(setNotPass,adoptFunc,lodash.get(info,'auditStatus',0),setVisible)}
    </Card>
    )
    function adoptFunc(){
        merchantAdoptApi({merchantId:lodash.get(info,'id',0)}).then((res)=>{
            message.success("审核通过")
            setVisible&&setVisible(false)
            reloadListFunc&&reloadListFunc()
        }).catch(()=>{
            message.error("审核出错")
        })
    }
    
}

function getOptionButtons(setNotPass:Function,adoptFunction:Function,auditStatus:number,setVisible:any) {
    // const type={"待审核":0,"审核驳回":2,"审核通过":1}

    return(
        <div style={{display:"flex",justifyContent:"flex-end"}}>
            <Space>

                <Button onClick={()=>setVisible(false)}>返回</Button>
                {AuditType["待审核"]===auditStatus&&
                <>
                    <Button onClick={()=>{setNotPass(true);}}>审核驳回</Button>
                    <Button style={{backgroundColor:"#54ae9d",color:"white"}} onClick={()=>adoptFunction()}>审核通过</Button>
                </>
                }
            </Space>
            
        </div>
    )
}
function getTable(info:any) {
    const dataSource = [
        info
    ];
    const columns = [
        {
          title: '商户id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '开通手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '老板姓名',
          dataIndex: 'bossName',
          key: 'bossName',
        },
        {
          title: '品牌名称',
          dataIndex: 'merchantName',
          key: 'merchantName',
        },
        {
            title: '产品类型',
            dataIndex: 'productType',
            key: 'productType',
          },
        {
          title: '所在城市',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: '门店地址',
          dataIndex: 'storeAddress',
          key: 'storeAddress',
        },
        {
          title: '门牌号码',
          dataIndex: 'houseNumber',
          key: 'houseNumber',
        },
        {
          title: '提交审核时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
        },
      ];
    return(
        <div>

            <Table dataSource={dataSource} columns={columns} pagination={false} />
            <Form layout={"vertical"} initialValues={{...info,idCardFaceImg:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}}>
                <Row>
                <Col span={5}>
                    <Form.Item label="身份证正面照" required name="idCardFaceImg">
                        <Image  width={"300px"} src={lodash.get(info,'idCardFaceImg',"")}/>
                    </Form.Item>
                </Col>
                <Col span={1}/>
                <Col span={5}>
                    <Form.Item label="身份证反面照" required name="idCardNationalEmblemImg">
                        <Image  width={"300px"}  src={lodash.get(info,'idCardNationalEmblemImg',"")}/>
                    </Form.Item>
                </Col>
                <Col span={1}/>
                <Col span={5}>
                    <Form.Item label="营业执照" required name="businessLicenceImg">
                        <Image  width={"300px"} src={lodash.get(info,'businessLicenceImg',"")}  />
                    </Form.Item>
                </Col>
                <Col span={1}/>
                <Col span={5}>
                    <Form.Item label="店铺门面照" required name="storeFacadeImg">
                        <Image width={"300px"} src={lodash.get(info,'storeFacadeImg',"")}/>
                    </Form.Item>
                </Col>
                </Row>
            </Form>
        </div>
    )
}
function getExtra(Info:any) {
    console.log(Info,'infoqqwwee');
    
    return(

            
                <Form initialValues={{...Info,...Info.currentUser}}>
                    <Row style={{width:"100%"}}>
                        {/* <Col span={3} style={{fontSize:"16px",fontWeight:"bold"}}>
                            商家信息
                        </Col> */}
                        <Col span={5}>
                            <Form.Item label="商户ID" name="merchantId" >
                                <Input readOnly  bordered={false}/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="审核状态" name="merchantState">
                                <Input readOnly  bordered={false} style={{color:"#54ae9d"}}/>
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={4}>
                            <Form.Item label="员工姓名" name="userName" >
                                <Input readOnly  bordered={false}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="员工工号：" name="id" required>
                                <Input readOnly  bordered={false}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
    )
}
export default connect(({user}: ConnectState) => ({
     userModel:user,
  }))(MerchantInfo);
// export default MerchantInfo;