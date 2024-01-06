import { CButton, CSpinner } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'
export default function SubmitButton(props) {
  return (
    <div className="d-flex align-items-center">
      <CButton type="submit" disabled={props.submitting} color="primary">
        {props.children}
      </CButton>
      {props.submitting ? <CSpinner color="primary" variant="grow" /> : null}
    </div>
  )
}
SubmitButton.propTypes = {
  submitting: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
