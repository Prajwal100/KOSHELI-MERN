import React from 'react'
import PropTypes from 'prop-types'

export default function InputError(props) {
  return (
    <div>
      <small className="help-block text-danger">{props.children}</small>
    </div>
  )
}
InputError.propTypes = {
  children: PropTypes.node.isRequired,
}
