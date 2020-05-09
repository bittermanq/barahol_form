import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';

import DataForm from './panels/DataForm';
import PhotoUpload from './panels/PhotoUpload';
import {suggestPost} from './api/index';

import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
    const [activePanel, setActivePanel] = useState('dataForm');
    const [adData, setAdData] = useState({
        name: null,
        price: null,
        place: null,
        description: null,
        type: null,
        post: null,
    });
    const [user, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    useEffect(() => {
        suggestPost();
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme 
                    ? data.scheme 
                    : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user /*{
                photo_200: "https://sun9-56.userapi.com/c622617/v622617027/44dc3/8FG7KF1GDeg.jpg?ava=1",
                first_name: "Max",
                last_name: "Qwe",
                city: {
                    title: "Tomsk"
                }
            }*/);
            setPopout(null);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (user == null) {
            return;
        }
        setAdData({ ...adData, place: user.city.title });
    }, [user]);

    const go = (to, data) => {
        setAdData(data);
        setActivePanel(to);
    };

    return (
        <View
            activePanel={activePanel}
            popout={popout}
        >
            <DataForm
                id="dataForm"
                user={user}
                data={adData}
                go={(data) => go("photoUpload", data)}
            />
            <PhotoUpload
                id="photoUpload"
                data={adData}
                go={(data) => go("dataForm", data)}
            />
        </View>
    );
}

export default App;

