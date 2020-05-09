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

const DataForm = ({ id, go, fetchedUser, data }) => {

    const ValidResult = "valid";
    const ErrorResult = "error"
    const DefaultResult = "default";
    const FormName = "form";

    const [status, setStatus] = useState({
        name: DefaultResult,
        price: DefaultResult,
        place: DefaultResult,
        description: DefaultResult,
    });
    const [isErrorInForm, setIsErrorInForm] = useState(false);

    useEffect(() => {
        document.forms[FormName]["price"].addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57) {
                evt.preventDefault();
            }
        });
    }, []);

    useEffect(() => {
        const form = document.forms[FormName];
        form.name.value = data.name;
        form.price.value = data.price;
        form.place.value = data.place;
        form.description.value = data.description;
        form.type.value = data.type;
        form.post.value = data.post;
    }, []);

    const validateAndProceed = () => {
        const form = document.forms[FormName];
        const name = form.name;
        const price = form.price;
        const place = form.place;
        const description = form.description;

        const newStatus = { ...status };

        name.value == "" ? newStatus.name = ErrorResult : newStatus.name = ValidResult;
        place.value == "" ? newStatus.place = ErrorResult : newStatus.place = ValidResult;
        description.value == "" ? newStatus.description = DefaultResult : newStatus.description = ValidResult;

        price.value == "" || isNaN(price.value) ? newStatus.price = ErrorResult : newStatus.price = ValidResult;

        const isErrorInForm = newStatus.name == ErrorResult
            || newStatus.price == ErrorResult
            || newStatus.place == ErrorResult;

        setIsErrorInForm(isErrorInForm);
        setStatus(newStatus);

        if (isErrorInForm) {
            return;
        }

        go({
            name: name.value,
            price: price.value,
            place: place.value,
            description: description.value,
            type: form.type.value,
            post: form.post.value,
        });
    }

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

            <FormLayout name={FormName}>
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
                    <option value={true}>Отправка возможна</option>
                    <option value={false}>Без отправки</option>
                </Select>
            </FormLayout>

            <Button onClick={validateAndProceed}>Принять и загрузить фото...</Button>
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
