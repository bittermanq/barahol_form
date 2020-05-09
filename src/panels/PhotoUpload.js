import React from 'react';
import PropTypes from 'prop-types';
import {
    platform,
    IOS,
    Panel,
    PanelHeader,
    PanelHeaderButton,
} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import persik from '../img/persik.png';
import './Persik.css';

const osName = platform();

const PhotoUpload = ({ id, data, go }) => (
    <Panel id={id}>
        <PanelHeader
            left={
                <PanelHeaderButton onClick={() => go(data)}>
                    {
                        osName === IOS
                            ? <Icon28ChevronBack />
                            : <Icon24Back />
                    }
                </PanelHeaderButton>}
        >
            Persik
		</PanelHeader>
        <img className="Persik" src={persik} alt="Persik The Cat" />
        <Button></Button>
    </Panel>
);

PhotoUpload.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default PhotoUpload;
