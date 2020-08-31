import React, {useState, useEffect} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import { Input, Select, Modal, Form, Button, notification } from 'antd'
import {
  comparePasswordValidator,
  passwordValidator,
  phoneNumberValidator,
  usernameValidator
} from "../../../utils/FormValidator";
import {useHistory} from 'react-router-dom'
import {base_url, get_request, post_request} from '../../../utils/HttpRequest';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const FormAdd = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isFetchRole, setIsFetchRole] = useState(false);
  const history = useHistory()
  useEffect(() => {

  }, [])
  async function fetchRole() {
    try {
      const {data} = await get_request({url: base_url +'/view-roles?page=1&perpage=100'})
      setRoles(data.items)
      setIsFetchRole(false)
    } catch (e) {
      setIsFetchRole(false)
    }
  }
  const fetchDataRole = () => {
    setIsFetchRole(true)
    fetchRole().then(() =>{})
  }

  const confirm = (values) => {
    Modal.confirm({
      title: 'Confirm Submit',
      content: 'Are you sure',
      okText: 'Yes',
      onOk: () => {
        fetchAdd(values)
      },
      cancelText: 'No'
    });
  }
  const onFinish = values => {
    confirm(values)
  }
  const onReset = () => {
    form.resetFields();
  }
  const fetchAdd = async (values) => {
    setLoading(true)
    try {
      const {fullName, role, username, password, email, phone_number} = values
      const valuePost = {
        full_name: fullName,
        role_id: role,
        password,
        username,
        email,
        phone_number
      }
      await post_request({url: base_url + '/create-user', data: valuePost})
      showNotif('success')
    } catch (e) {
      setLoading(false)
      showNotif('failed')
    }
  }
  const showNotif = type => {
    let message = ''
    let description = ''
    if (type === 'success') {
      message = 'Success'
      description = 'Success Add User, Please wait you will redirect to User Management Page'
    } else {
      message = 'Failed'
      description = 'Faild Add User, Please try again.'
    }
    notification[type]({
      message,
      description,
      duration: 2.5,
      onClose: () => {
        history.goBack()
      }
    });
  };
  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
            },
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            {
              required: true,
            },
            {
              validator(rule, value, cb) {
                phoneNumberValidator(rule, value, cb)
              }
            }
          ]}
        >
          <Input  pattern="\d*"
                  maxLength={13}
                  minLength={8}
                  disabled={loading} />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
            },
            {
              validator(rule, value, cb) {
                usernameValidator(rule, value, cb)
              }
            }
          ]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
            {
              validator(rule, value, cb) {
                passwordValidator(rule, value, cb)
              }
            }
          ]}
        >
          <Input.Password disabled={loading} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Re-Type Password"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value, cb) {
                comparePasswordValidator(rule,value,getFieldValue('password'),cb)
              },
            }),
          ]}
        >
          <Input.Password disabled={loading} />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a role for this user"
            allowClear
            disabled={loading}
            onFocus={()=> roles.length === 0 ? fetchDataRole() : undefined}
          >
            {isFetchRole ? <Option value="" disabled>Please wait ...</Option> : null}
            {
              roles.map((item, idx)=> (
                <Option key={idx} value={`${item.role_id}`}>{item.role_name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading} >
            Submit
          </Button>{' '}
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ManagementUserAdd = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <CCardTitle className='card-title-custom'>Add User</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <FormAdd />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}



export default ManagementUserAdd
