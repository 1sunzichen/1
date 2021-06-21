/*
 * @Author: 孙家奇 
 * @Date: 2021-06-19 14:24:58 
 * @Last Modified by: 孙家奇
 * @Last Modified time: 2021-06-19 14:27:37
 * storeList门店list列表信息中’运力平台‘审核模块需要调用斌哥接口，暂时未提供，可以先写假数据，后续提供了再补充
 */

import {Card,Form,Input,Row,Col,Table,Image} from 'antd';
import lodash from 'lodash';
import {productTypeDict} from '../index';
const StoresInformation=(props:any)=>{
    const {storeList}=props;
    return(
        <Card title={`门店名称`} style={{ width: "100%" }}>
            {getMerchantTable(storeList)}
            {getPlatformList()}
        </Card>
    )
    function getMerchantTable(storeList:any) {
        // const dataSource = [
        //     {
        //       id: '1',
        //       phone:'15210187668',
        //       bossName: '胡彦斌',
        //       merchantName: 'channel',
        //       productType: '餐饮喝水',
        //       city: '北京',
        //       storeAddress: '大兴',
        //       houseNumber: '505号',
        //       updateTime: '2021-06-17',
        //     },
            
        // ].concat(storeList);
        function getDescriptDom(record:any){
            return(
                <Form layout={"vertical"} initialValues={record}>
                    <Row>
                    <Col span={5}>
                        <Form.Item label="负责人身份证正面(人像)" required >
                            <Image  width={"300px"}  src={lodash.get(record,'idCardFaceImg',"")}/>
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={5}>
                        <Form.Item label="负责人身份证反面(国徽)" required>
                            <Image  width={"300px"}  src={lodash.get(record,'idCardNationalEmblemImg',"")}/>
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={5}>
                        <Form.Item label="营业执照" required>
                            <Image  width={"300px"}   src={lodash.get(record,'businessLicenceImg',"")}/>
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={5}>
                        <Form.Item label="店铺门面照" required>
                            <Image width={"300px"}  src={lodash.get(record,'storeFacadeImg',"")}/>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="手持身份证" required>
                            <Image width={"300px"}  src={lodash.get(record,'holdingIdCardImg',"")}/>
                        </Form.Item>
                    </Col>
                    <Col span={1}/>
                    <Col span={5}>
                        <Form.Item label="手持营业执照" required>
                            <Image width={"300px"}  src={lodash.get(record,'holdingBusinessLicenceImg',"")}/>
                        </Form.Item>
                    </Col>
                    {/* <Col span={12} className="formInterInfo"> */}
                        {/* <Form layout="inline" initialValues={{"photo12":"123"}}  
                        // {...layout}
                        > */}
                    <div style={{width:"50%"}} className="formInterInfo" >

                            <Form.Item label="负责人姓名" required name="chargeName" 
                            labelCol={{span: 8, offset: 3}}
                            wrapperCol={{span: 10, offset: 1}}
                            >
                                <Input readOnly  bordered={false}/>
                            </Form.Item>
                            <Form.Item label="负责人身份证号" required
                            name="chargeIdCardNumber"
                            labelCol={{span: 8, offset: 3}}
                            wrapperCol={{span: 10, offset: 1}}
                            >
                                <Input readOnly  bordered={false}/>
                            </Form.Item>
                            <Form.Item label="统一社会信用代码" required
                            name="unifiedSocialCreditCode"
                            labelCol={{span: 8, offset: 3}}
                            wrapperCol={{span: 10, offset: 1}}
                            >
                                <Input readOnly  bordered={false}/>
                            </Form.Item>
                            
                     
                                
                    </div>

                        {/* </Form> */}
                        {/* </Col> */}
                    </Row>
                </Form>
            )
        }
        const columns = [
            {
              title: '联系方式',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: '店铺名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '产品类型',
              dataIndex: 'productType',
              key: 'productType',
              render:(text:string)=>{
                return(
                    productTypeDict[text]||""
                )
              }
              
            },
            {
              title: '所在城市',
              dataIndex: 'merchantName',
              key: 'merchantName',
            },
            {
              title: '门店地址',
              dataIndex: 'city',
              key: 'city',
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
                <Table dataSource={storeList} columns={columns} pagination={false}  rowKey={"id"}
                    expandable={{
                        expandedRowRender: record => getDescriptDom(record),
                      }}
                />
            </div>
        )
    }
    function getPlatformList() {
        const dataSource = [
            {
                id: '1',
                operatorName:'胡彦斌',
                operation: '审核驳回',
                remark: '餐饮喝水',
                operatorTime: '2021-06-17',
            },
           
            
        ];
        const columns = [
            {
                title: '运力平台',
                dataIndex: 'operatorName',
                key: 'operatorName',
            },
            {
                title: '闪送',
                dataIndex: 'operation',
                key: 'operation',
            },
            {
                title: '顺丰',
                dataIndex: 'remark',
                key: 'remark',
            },
            {
                title: '达达',
                dataIndex: 'operatorTime',
                key: 'operatorTime',
            },
            {
                title: '美团跑腿',
                dataIndex: 'operatorTime',
                key: 'operatorTime',
            },
            {
                title: '蜂鸟跑腿',
                dataIndex: 'operatorTime',
                key: 'operatorTime',
            },
            {
                title: 'uu跑腿',
                dataIndex: 'operatorTime',
                key: 'operatorTime',
            },
            {
                title: '点我达',
                dataIndex: 'operatorTime',
                key: 'operatorTime',
            },
            {
                title: '云帮送/今斗云',
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
export default StoresInformation;