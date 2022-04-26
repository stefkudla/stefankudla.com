import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const PageContainer: React.FC<LayoutProps> = ({ children }) => {
  return <main className="container mx-auto px-1 sm:px-5">{children}</main>
}

export default PageContainer
