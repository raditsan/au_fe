import React, {useState, useEffect} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader, CCardTitle,
  CCol,
  CRow
} from '@coreui/react'
import {Table, Form, Input, Button, Select, Space, notification} from 'antd';
import {base_url, get_request, post_request} from "../../../utils/HttpRequest";
import moment from "moment";

const RoleForm = ({onSubmitForm}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const children = [];
  const { Option } = Select;
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }
  const showNotif = type => {
    let message = ''
    let description = ''
    if (type === 'success') {
      message = 'Success'
      description = 'Success Add Role'
    } else {
      message = 'Failed'
      description = 'Faild Add Role'
    }
    notification[type]({
      message,
      description,
      duration: 2.5,
      onClose: () => {

      }
    });
  };
  const onFinish = async values => {
    setLoading(true)
    try {
      await post_request({url: base_url + '/create-role', data: {role_name: values.roleName, user_create_id: 'system'}})
      onSubmitForm()
      showNotif('success')
      setLoading(false)
    } catch (e) {
      showNotif('error')
      setLoading(false)
    }
  }

  return (
    <>
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <h5>Create New Role</h5>
        <Form.Item
          label="Role Name"
          name="roleName"
          rules={
            [{
              required: true,
            }]
          }
        >
          <Input
            placeholder="input placeholder"
            disabled={loading}
          />
        </Form.Item>
        <Form.Item
          label="Akses Role"
          name="accessRole"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            disabled={loading}
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item >
          <Button htmlType="submit" loading={loading} type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </>
  )
}

const RoleTable = ({refreshRoleTrigger = 0}) => {
  const [stateData, setStateData] = useState({
    filteredInfo: null,
    sortedInfo: null,
    listRole: [],
    loadingTable: false
  });

  const setState = (values = {}) => {
    setStateData({
      ...stateData,
      ...values
    })
  }
  const state = stateData

  const fetchRole = async () => {
    setState({
      loadingTable: true,
    })
    try {
      const {data} = await get_request({url: base_url + '/view-roles'})
      setState({
        listRole: data.items,
        loadingTable: false
      })
    } catch (e) {
      setState({
        loadingTable: false
      })
    }
  }

  useEffect(() => {
    fetchRole()
  }, []);

  useEffect(()=>{
    if (refreshRoleTrigger !== 0) {
      fetchRole()
    }
  }, [refreshRoleTrigger])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'Role Id',
      dataIndex: 'role_id',
      onFilter: (value, record) => record.role_id.includes(value),
      sorter: (a, b) => a.role_id.length - b.role_id.length,
      sortOrder: sortedInfo.columnKey === 'role_id' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Role Name',
      dataIndex: 'role_name',
      onFilter: (value, record) => record.role_name.includes(value),
      sorter: (a, b) => a.role_name.length - b.role_name.length,
      sortOrder: sortedInfo.columnKey === 'role_id' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Create At',
      dataIndex: 'create_at',
      render: text => moment(text).format('YYYY/MM/DD'),
      ellipsis: true,
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   filters: [
    //     { text: 'London', value: 'London' },
    //     { text: 'New York', value: 'New York' },
    //   ],
    //   filteredValue: filteredInfo.address || null,
    //   onFilter: (value, record) => record.address.includes(value),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    //   ellipsis: true,
    // },
  ];

  return (
    <>
      <h5>Role's List</h5>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={state.listRole} onChange={handleChange} loading={state.loadingTable} rowKey={'role_id'} />
    </>
  );
}


const ManagementRole = () => {
  const [stateData, setStateData] = useState({refreshRoleTrigger: 0});
  const setState = (values = {}) => {
    setStateData({
      ...stateData,
      ...values
    })
  }
  const state = stateData

  const submitRole = () => {
    setState({
      refreshRoleTrigger: state.refreshRoleTrigger + 1
    })
  }
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <CCardTitle className='card-title-custom'>Role Management</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" sm="6">
                  <RoleForm onSubmitForm={submitRole} />
                </CCol>
                <CCol xs="12" sm="6">
                  <RoleTable refreshRoleTrigger={state.refreshRoleTrigger} />
                </CCol>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ManagementRole
