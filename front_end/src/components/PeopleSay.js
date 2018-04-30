import React from 'react';
import { Timeline } from 'react-twitter-widgets';

class PeopleSay extends React.Component {
    render() {
        return (
            <div >
                <Timeline 
                    dataSource={{
                    sourceType: 'profile',
                    screenName: 'weatherchannel'
                    }}
                    options={{
                    username: 'weatherchannel',
                    height: '90vh'
                    }}
                    onLoad={() => console.log('Timeline is loaded!')}
                />
            </div>
        )
    }
}

export default PeopleSay;