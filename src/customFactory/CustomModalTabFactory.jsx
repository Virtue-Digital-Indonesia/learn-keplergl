import React from 'react'
import { Button, Stack } from '@mui/material'

const CustomModalTab = (...deps) => {
  return (
    <Stack direction='row' sx={{
      backgroundColor: '#F0F0F0',
      borderRadius: '8px',
      width: 'fit-content',
      padding: '0 2px'
    }}>
      {deps[0].loadingMethods.map(item => (
        <Button key={item.id} sx={{
          backgroundColor: deps[0].currentMethod === item.id ? 'white' : 'transparent',
          width: 'fit-content',
          textTransform: 'capitalize',
          fontWeight: 400,
          color: deps[0].currentMethod ? '#000000' : '#CFCFCF',
          padding: '8px 32px',
          fontSize: '12px',
          margin: '4px 2px',
          '&:hover': {
            backgroundColor: '#FFFFFF'
          }
        }} onClick={() => deps[0].toggleMethod(item)}>{item.label}</Button>
      ))}
    </Stack>
  )
}

const CustomModalTabFactory = () => CustomModalTab

export default CustomModalTabFactory