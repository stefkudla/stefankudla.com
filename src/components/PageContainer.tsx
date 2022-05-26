const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className="container mx-auto px-1 sm:px-5">{children}</main>
}
export default PageContainer
