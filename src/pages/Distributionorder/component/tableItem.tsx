import ProCard from '@ant-design/pro-card';
import { Button,Row,Form,Input} from 'antd';

const TableItem=(info:unknown)=>{
    console.log(info,'info');
    
    return(
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
    )
}
export default TableItem;