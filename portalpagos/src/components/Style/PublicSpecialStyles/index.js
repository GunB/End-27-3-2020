import React from 'react'

const PublicSpecialStyles = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
    body{
      font-family: 'Helvetica Neue LT Std 47 Light Condensed', 'Helvetica-Neue', 'Helvetica Neue LT Std', 'Helvetica Neue LT Std 45 Light', Nunito Sans, sans-serif;
      font-size: 15px;
    }
    a{
      text-decoration: underline;
    }
  `,
      }}
    />
  )
}

export default PublicSpecialStyles
