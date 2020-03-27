import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const MessageBox = ({ titulo, mensaje, children }) => {
  return (
    <>
      <div
        style={{
          minHeight: 'calc(100vh - 500px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            backgroundColor: '#fff',
            padding: '80px 30px',
            margin: '100px auto',
            borderRadius: '10px',
            flex: '1',
          }}
        >
          <div
            style={{
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <h1 className="font-size-24 mb-2 ">{titulo}</h1>
            <p className="mb-3">{mensaje}</p>
            {children || (
              <Button type="primary">
                <Link to="/">&larr; Regresar a la página inicial</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageBox
