const PostTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-fore-primary text-3xl md:text-5xl font-bold tracking-normal leading-tight md:leading-none mb-12 mt-12">
    {children}
  </h1>
)
export default PostTitle
