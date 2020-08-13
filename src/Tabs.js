import React from 'react';
import {Tabs} from 'antd'
import 'antd/dist/antd.css';
const { TabPane } = Tabs;
const NewsTab = (props) => (
  
  <Tabs defaultActiveKey="1" className="tab-box" style={{ width: props.width }}>
    <TabPane tab="Tab 1" key="1">
       <section className="container">
          <div><div className="text">(DIS - NYSE) Walt Disney Company</div><div className="priceChange">▴1.36%</div><div className="price">$550.40</div></div>
          <div><div className="text">(DIS - NYSE) Walt Disney Company</div><div className="priceChange">▴1.36%</div><div className="price">$550.40</div></div>
        </section>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

export default NewsTab;