import { oswald } from '@/fonts'

const PostTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-4xl text-fore-primary">{children}</h1>
)
export default PostTitle
