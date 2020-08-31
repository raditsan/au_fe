import React, {useState, useEffect} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CDataTable, CPagination,
  CRow, CButton, CLink, CCardTitle
} from '@coreui/react'
import {base_url, get_request} from "../../../utils/HttpRequest";
import {Link, useHistory, useLocation} from "react-router-dom";
import moment from 'moment'
import CIcon from "@coreui/icons-react";
const ManagementUser = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const queryTotalPage = useLocation().search.match(/total-page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const currentTotalPage = Number(queryTotalPage && queryTotalPage[1] ? queryTotalPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [totalPage, setTotalPage] = useState(currentTotalPage)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/user-management/users?page=${newPage}&total-page=${totalPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    setLoading(true)
  }, [currentPage, page])

  useEffect(() => {
    fetchUser().then(() => {})
  }, [page])

  const fetchUser = async () => {
    try {
      const user = await get_request({url: base_url + '/view-users?page=' + page})
      setTotalPage(Math.ceil(user.data.totalCount / 10))
      setUserData(user.data.items)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <CCardTitle className='card-title-custom'>User Management</CCardTitle>
              <div className="card-header-actions">
                <Link to='/user-management/add-user' className="card-header-action">
                  <CIcon name="cil-settings" /> Add User
                </Link>
              </div>

            </CCardHeader>
            <CCardBody>
              <CDataTable
                loading={loading}
                items={userData}
                fields={[
                  { key: 'full_name', _classes: 'font-weight-bold' },
                  {key: 'create_at', label: 'Create At'},
                  'email',
                  {key: 'flag_active', label: 'Status'}
                ]}
                hover
                striped
                // itemsPerPage={10}
                // activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/user-management/users-id/${item.user_id}`)}
                scopedSlots = {{
                  'create_at':
                    (item)=>(
                      <td>
                        {moment(item.create_at).format('YYYY/MM/DD')}
                      </td>
                    ),
                  'flag_active':
                    (item)=>(
                      <td>
                        <CBadge color={item.flag_active ? 'success' : 'danger'}>
                          {item.flag_active ? 'ACTIVE' : 'INACTIVE'}
                        </CBadge>
                      </td>
                    )
                }}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={totalPage}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ManagementUser
