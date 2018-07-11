import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Badge,
} from 'antd';

import styles from './index.less';
import Detail from './detail'
import List from './list'

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


@connect(({ host, loading }) => ({
  host,
  loading: loading.models.host,
}))
@Form.create()
export default class Index extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'host/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };



  handleSelectRows = rows => {
    const { dispatch } = this.props;
    const payload = { selectedRows: rows }
    dispatch({
      type: 'publicMethod',
      payload,
    })
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };


   renderSimpleForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  render() {
    const {
      host: { data, selectedRows},
      loading,
      dispatch,
    } = this.props;

    const columns = [
      {
        title: '主机编号',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '状态',
        dataIndex: 'type',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'date',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a onClick={handleDetail}>详情</a>
          </Fragment>
        ),
      },
    ];

    const handleDetail = () => {
      const payload = {
        showList: false,
        showDetail: true,
      }
      dispatch({
        type: 'host/publicMethod',
        payload,
      });
    }

    const handleCancal = () => {
      const payload = {
        showList: true,
        showDetail: false,
      }
      dispatch({
        type: 'host/publicMethod',
        payload,
      });
    }

    const renderForm = () => {
      return this.renderSimpleForm();
    }

    const { host } = this.props
    const {showList, showDetail} = host
    return (
      <div>
        { showList  && (
          <List
            selectedRows={selectedRows}
            loading={loading}
            columns={columns}
            renderForm={renderForm}
            data={data}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        )}
        {showDetail && (
          <Detail onCancle={handleCancal} />
        )}

      </div>


    );
  }
}
