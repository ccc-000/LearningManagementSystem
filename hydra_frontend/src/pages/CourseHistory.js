import React from 'react';
import { Card, Button, Timeline } from 'antd';
import { useState } from 'react';
import { LeftCircleOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import 'antd/dist/reset.css';
import '../styles/CourseHistory.css';

function CourseHistory() {
    const [reverse, setReverse] = useState(false);
    const handleClick = () => {
        setReverse(!reverse);
    };
    return (
        <div className="EnrolmentHistory">
            <Link to="/Profile"><LeftCircleOutlined style={{fontSize: 30, margin: 15, color: 'grey'}}/></Link>
            <Card
                id="EnrolmentHistory-Card"
                bordered={false}
                style={{
                width: 780,
                height: 500,
                }}
            >
                <div id="EnrolmentHistory-Title"><span>Enrolment History</span></div>
                <div id="EnrolmentHistory-Content">
                    <Timeline
                        pending="Recording..."
                        reverse={reverse}
                        items={[
                            {
                                children: 'Term One, 2023 COMP9900',
                            },
                            {
                                children: 'Term One, 2023 COMP9321',
                            },
                            {
                                children: 'Term One, 2023 MATH5905',
                            },
                        ]}
                    />
                </div>
                <div id="EnrolmentHistory-ToggleReverse"><Button type="primary" onClick={handleClick} size="large">Toggle Reverse</Button></div>
            </Card>
        </div>
    );
}

export default CourseHistory;