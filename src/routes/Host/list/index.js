/**
 * @desc 主机列表页
 * @author mazy
 * date 2018/7/9
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../index.less';

const List = ({selectedRows, loading, renderForm, data, columns, onSelectRow, onChange}) => {


  const handleRenderForm = () => {
    renderForm()
  }
  const handleOnSelectRow = () => {
    onSelectRow()
  }
  const handleOnChange = () => {
    onChange()
  }


  return (
    <PageHeaderLayout title="主机列表">
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{renderForm()}</div>

          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            renderForm={handleRenderForm}
            data={data}
            columns={columns}
            onSelectRow={handleOnSelectRow}
            onChange={handleOnChange}
          />
        </div>
      </Card>
    </PageHeaderLayout>
  )
}


List.propTypes = {
  loading : PropTypes.bool,
  selectedRows: PropTypes.array,
  renderForm: PropTypes.func,
  data: PropTypes.object,
  columns: PropTypes.array,
  onSelectRow: PropTypes.func,
  onChange: PropTypes.func,
}

export default List
