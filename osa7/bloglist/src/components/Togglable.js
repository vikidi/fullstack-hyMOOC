import React, { useState, useImperativeHandle } from 'react'

import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Provides possibility to use from parents
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button style={{ margin: '5px' }} variant='contained' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, { toggleVisibility: toggleVisibility })}
        <Button style={{ margin: '5px' }} variant='contained' color='primary' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

export default Togglable