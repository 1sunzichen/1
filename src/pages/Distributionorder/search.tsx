import React, { useState } from 'react';
import { Card, Input, Tabs } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import ProForm, { QueryFilter, ProFormText, ProFormDatePicker,ProFormDateRangePicker } from '@ant-design/pro-form';
import styles from './search-filter.module.less';

const { TabPane } = Tabs;

type AdvancedSearchProps = {
  onFilterChange?: (allValues: any) => void;
  onSearch?: (text: string) => void;
  onTypeChange?: (type: string) => void;
  defaultType?: string;
//   onFinish:any;
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = (props) => {
//   const { onSearch, defaultType = 'articles', onFilterChange } = props;
  const [searchTab, setSearchTab] = useState<string>("articles");
  const [showFilter, setShowFilter] = useState<boolean>(true);
  return (
    <Card
      bodyStyle={{ paddingBottom: 0 }}
      bordered={false}
    //   className={showFilter ? '' : styles.hiddenFilter}
    >
    
      <QueryFilter
        // submitter={{onReset:()=>{
            
        //     setSearchTab("文章")
        //     console.log();
        // }}}
        defaultCollapsed={false}
        defaultColsNumber={7}
        key={searchTab}
        onReset={async(values) => {
            console.log(values,'values');
            
            setSearchTab("articles")
        }}
        span={24}
        labelWidth="auto"
        split
        // onChange={onChange}
        onFinish={async (values) => {
            console.log(values,'values',{...values,searchTab});
        }}
        className={styles.filter}
      >
        <ProFormDateRangePicker name="create" label="下单时间" colSize={3} />
        <ProForm.Group title=" ">
          <ProFormText name="name1" placeholder="输入订单号" />
          <ProFormText name="name2" placeholder="输入运单号"/>
          <ProFormText name="name3" placeholder="三方配送单号"/>
        </ProForm.Group>
        <ProForm.Group title="配送单状态">
            <Tabs
            defaultActiveKey={searchTab}
            onChange={onTypeChange}
            >
            <TabPane tab="全部" key="articles" />
            <TabPane tab="调度中" key="projects" />
            <TabPane tab="平台已接单" key="applications" />
            <TabPane tab="配送员已接单" key="articles2" />

            </Tabs>
        </ProForm.Group>
        <ProForm.Group title="配送平台">
          <ProFormText name="name" />
        </ProForm.Group>
        <ProForm.Group title="配送城市">
          <ProFormText name="age" />
        </ProForm.Group>
      </QueryFilter>
    </Card>
  );
  function onTypeChange(value:any){
    setSearchTab(value)
  }
};

export default AdvancedSearch;