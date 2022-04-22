import React from 'react'

const PageContainer = ({ children }: { children: any }) => {
  return <main className="container mx-auto px-1 sm:px-5">{children}</main>
}

export default PageContainer
