import React, {useState} from 'react'
import styles from './index.css'
import {
    NavBar, Icon, 
    Flex, WhiteSpace, WingBlank,
    Card, PickerView, Picker
} from 'antd-mobile'

export default function Training() {
    const season = [
        {
          label: '春',
          value: '春',
        },
        {
          label: '夏',
          value: '夏',
        },
      ];
    return (
        <>

            <NavBar
                className={styles.nav_bar}
                mode="dark"
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >
                NavBar
            </NavBar>

            <WingBlank className={styles.content}>
                <WhiteSpace size="lg" />
                <Card>
                    <Card.Header title="推胸"></Card.Header>
                    <Card.Body>
                        <div>
                            <span>重量</span>
                            <input readonly="readonly"></input>
                            <Picker data={season}></Picker>
              
                        </div>
                        <div>数量</div>
                        <div>组数</div>
                    </Card.Body>
                </Card>
            </WingBlank>

        </>
    )
}