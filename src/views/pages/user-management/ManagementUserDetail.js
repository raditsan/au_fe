import React, {useEffect, useState} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {base_url, get_request} from "../../../utils/HttpRequest";

const ManagementUserDetail = ({match}) => {
  const [user, setUser] = useState({});
  useEffect(()=>{
    fetchDataUser()
  }, [])
  const fetchDataUser = async () => {
    try {
      const user = await get_request({url: base_url + '/view-users/byId/' + match.params.id})
      setUser(user.data.item)
    } catch (e) {

    }
  }
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <pre>
              {JSON.stringify(user, null, 3)}
            </pre>
            <table className="table table-striped table-hover">
              <tbody>
              {/*{*/}
              {/*  userDetails.map(([key, value], index) => {*/}
              {/*    return (*/}
              {/*      <tr key={index.toString()}>*/}
              {/*        <td>{`${key}:`}</td>*/}
              {/*        <td><strong>{value}</strong></td>*/}
              {/*      </tr>*/}
              {/*    )*/}
              {/*  })*/}
              {/*}*/}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ManagementUserDetail
