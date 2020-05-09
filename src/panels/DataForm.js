import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Select,
    FormLayout,
    Button,
    PanelHeader,
    Panel,
    Cell,
    Textarea,
    Input,
    Div,
    InfoRow,
    FormStatus,
} from '@vkontakte/vkui';

const DataForm = ({ id, go, fetchedUser }) => {

    const valid = "valid";
    const error = "error"
    const deft = "default";

    const [status, setStatus] = useState({
        name: deft,
        price: deft,
        place: deft,
        description: deft,
    });

    useEffect(() => {    
        document.forms["form"]["price"].addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
    }, []);

    const validate = () => {
        const form = document.forms["form"];
        const name = form.name;
        const price = form.price;
        const place = form.place;
        const description = form.description;

        const newStatus = { ...status };

        name.value == "" ? newStatus.name = error : newStatus.name = valid;
        place.value == "" ? newStatus.place = error : newStatus.place = valid;
        description.value == "" ? newStatus.description = deft : newStatus.description = valid;

        isNaN(price.value) ? newStatus.price = error : newStatus.price = valid;

        setStatus(newStatus);
    }

    const isErrorInForm = status.name == error
        || status.price == error
        || status.place == error;

    return (
        <Panel id={id}>
            <PanelHeader>Подать объявление</PanelHeader>

            {
                fetchedUser &&
                <Group title="User Data">
                    <Cell
                        before={
                            fetchedUser.photo_200
                                ? <Avatar src={fetchedUser.photo_200} />
                                : null
                        }
                        description={
                            fetchedUser.city && fetchedUser.city.title
                                ? fetchedUser.city.title
                                : ''
                        }
                    >
                        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                    </Cell>
                </Group>
            }

            <FormLayout name="form">
                {
                    isErrorInForm &&
                    <FormStatus mode={"error"}>
                        Пожалуйста, заполните все обязательные поля
                    </FormStatus>
                }
                <Select
                    defaultValue="sell"
                    top="Тип объявления"
                    id="type"
                >
                    <option value="sell">Продам</option>
                    <option value="buy">Куплю</option>
                    <option value="exchange">Обменяю</option>
                    <option value="other">Другое</option>
                </Select>
                <Input
                    placeholder="Марка, модель"
                    top="Наименование *"
                    multiple={false}
                    status={status.name}
                    id="name"
                />
                <Textarea
                    top="Описание"
                    multiple={true}
                    status={status.description}
                    id="description"
                />
                <Input
                    top="Цена, ₽ (только число) *"
                    multiple={false}
                    status={status.price}
                    id="price"
                />
                <Input
                    top="Место, где находится товар; населенный пункт *"
                    multiple={false}
                    status={status.place}
                    id="place"
                />
                <Select
                    defaultValue="yes"
                    top="Возможность отправки"
                    status={status.post}
                    id="post"
                >
                    <option value="yes">Отправка возможна</option>
                    <option value="no">Без отправки</option>
                </Select>
            </FormLayout>

            <Button onClick={validate}>Принять и загрузить фото ></Button>
        </Panel>
    )
};

DataForm.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default DataForm;
