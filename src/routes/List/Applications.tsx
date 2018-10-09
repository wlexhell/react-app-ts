import * as React from 'react';
import numeral from 'numeral';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu } from 'antd';

import TagSelect from '../../components/TagSelect';
import StandardFormRow from '../../components/StandardFormRow';

import './Applications.less';

const { Option } = Select;
const FormItem = Form.Item;

const formatWan = val => {
    const v = val * 1;
    if (!v || isNaN(v)) {
        return '';
    }

    let result = val;
    if (val > 10000) {
        result = Math.floor(val / 10000);
        result = (
            <span>
                {result}
                <em className={'wan'}>万</em>
            </span>
        );
    }
    return result;
};

/* eslint react/no-array-index-key: 0 */

// @connect(({ list, loading }) => ({
//     list,
//     loading: loading.models.list,
// }))
class FilterCardList extends React.Component<{form, loading:boolean, list }> {
    public componentDidMount() {
        // this.props.dispatch({
        //     type: 'list/fetch',
        //     payload: {
        //         count: 8,
        //     },
        // });
    }

    private handleFormSubmit = () => {
        const { form } = this.props;
        // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
        setTimeout(() => {
            form.validateFields(err => {
                if (!err) {
                    // eslint-disable-next-line
                    // dispatch({
                    //     type: 'list/fetch',
                    //     payload: {
                    //         count: 8,
                    //     },
                    // });
                }
            });
        }, 0);
    };

    public render() {
        const { list=[], loading, form } = this.props;
        const { getFieldDecorator } = form;

        const CardInfo = ({ activeUser, newUser }) => (
            <div className={'cardInfo'}>
                <div>
                    <p>活跃用户</p>
                    <p>{activeUser}</p>
                </div>
                <div>
                    <p>新增用户</p>
                    <p>{newUser}</p>
                </div>
            </div>
        );

        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const itemMenu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        1st menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        2nd menu item
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                        3d menu item
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={'filterCardList'}>
                <Card bordered={false}>
                    <Form layout="inline">
                        <StandardFormRow title="所属类目" block={true} style={{ paddingBottom: 11 }}>
                            <FormItem>
                                {getFieldDecorator('category')(
                                    <TagSelect onChange={this.handleFormSubmit} expandable={true}>
                                        <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                                        <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                                        <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                                        <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                                        <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                                        <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                                        <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                                        <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                                        <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                                        <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                                        <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                                        <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                                    </TagSelect>
                                )}
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow title="其它选项" grid={true} last={true}>
                            <Row gutter={16}>
                                <Col lg={8} md={10} sm={10} xs={24}>
                                    <FormItem {...formItemLayout} label="作者">
                                        {getFieldDecorator('author', {})(
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="不限"
                                                style={{ maxWidth: 200, width: '100%' }}
                                            >
                                                <Option value="lisa">王昭君</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col lg={8} md={10} sm={10} xs={24}>
                                    <FormItem {...formItemLayout} label="好评度">
                                        {getFieldDecorator('rate', {})(
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="不限"
                                                style={{ maxWidth: 200, width: '100%' }}
                                            >
                                                <Option value="good">优秀</Option>
                                                <Option value="normal">普通</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </StandardFormRow>
                    </Form>
                </Card>
                <List
                    rowKey="id"
                    // style={{ marginTop: 24 }}
                    grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                    loading={loading}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Card
                                hoverable={true}
                                bodyStyle={{ paddingBottom: 20 }}
                                actions={[
                                    <Tooltip title="下载" key={0}>
                                        <Icon type="download" />
                                    </Tooltip>,
                                    <Tooltip title="编辑" key={1}>
                                        <Icon type="edit" />
                                    </Tooltip>,
                                    <Tooltip title="分享" key={2}>
                                        <Icon type="share-alt" />
                                    </Tooltip>,
                                    <Dropdown overlay={itemMenu} key={3}>
                                        <Icon type="ellipsis" />
                                    </Dropdown>,
                                ]}
                            >
                                <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                                <div className={'cardItemContent'}>
                                    <CardInfo
                                        activeUser={formatWan(item.activeUser)}
                                        newUser={numeral(item.newUser).format('0,0')}
                                    />
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Form.create()(FilterCardList);
