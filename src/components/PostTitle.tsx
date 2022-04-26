const PostTitle: React.FC = ({ children }: { children: string }) => {
  return (
    <h1 className="text-fore-primary text-3xl font-bold tracking-normal leading-tight md:leading-none mb-12 text-center mt-12">
      {children}
    </h1>
  )
}
export default PostTitle
