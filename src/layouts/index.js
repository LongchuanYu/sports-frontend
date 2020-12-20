import { 
  TabBar,
  
 } from 'antd-mobile';
import router from 'umi/router'
import React from 'react'
import 'antd-mobile/dist/antd-mobile.css';


class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'training',
      hidden: false,
      fullScreen: false,
    };
  }

  renderContent() {
    return (
      // <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
      //   {this.props.children}
      // </div>
      <div >
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >



          <TabBar.Item
            title="训练"
            key="Training"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'training'}
            onPress={() => {
              router.push('/training')
              this.setState({
                selectedTab: 'training',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent()}
          </TabBar.Item>



          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="数据"
            key="Data"
            selected={this.state.selectedTab === 'data'}
            onPress={() => {
              router.push('/data')
              this.setState({
                selectedTab: 'data',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent()}
          </TabBar.Item>



          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              router.push('/my')
              this.setState({
                selectedTab: 'my',
              });
            }}
          >
            {this.renderContent()}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default BasicLayout;
