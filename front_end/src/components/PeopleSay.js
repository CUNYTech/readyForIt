import React from 'react';
import { Timeline } from 'react-twitter-widgets';

class PeopleSay extends React.Component {
    render() {
        return (
            <div>
                <Timeline
                    dataSource={{
                    sourceType: 'profile',
                    screenName: 'twitterdev'
                    }}
                    options={{
                    username: 'TwitterDev',
                    height: '400'
                    }}
                    onLoad={() => console.log('Timeline is loaded!')}
                />
            </div>
        )
    }
}

export default PeopleSay;