/**
 * Lifts a video reference out of the paragraph markdown wraps it in.
 *
 * `![caption](./thing.mp4)` on its own line becomes `<p><img/></p>`, and
 * `MdxImage` renders a `<figure>` for a video extension. `<figure>` is not
 * allowed inside `<p>`, so the browser silently closes the paragraph early and
 * the DOM stops matching React's tree — a hydration failure (React #418) that
 * leaves the whole subtree un-hydrated, which in turn means the
 * `prefers-reduced-motion` check never runs and no video ever plays.
 *
 * Only video-only paragraphs are unwrapped. Ordinary images stay inside their
 * paragraph, where `<img>` is valid and the prose spacing is already tuned.
 */
type Node = {
  type: string
  tagName?: string
  value?: string
  properties?: { src?: string }
  children?: Node[]
}

const isVideoImage = (node: Node) =>
  node.type === 'element' &&
  node.tagName === 'img' &&
  /\.mp4$/i.test(node.properties?.src ?? '')

const isBlank = (node: Node) =>
  node.type === 'text' && (node.value ?? '').trim() === ''

const rehypeUnwrapVideos = () => (tree: Node) => {
  const walk = (node: Node) => {
    if (!node.children) return
    node.children = node.children.flatMap(child => {
      walk(child)
      if (child.type === 'element' && child.tagName === 'p') {
        const meaningful = (child.children ?? []).filter(c => !isBlank(c))
        if (meaningful.length === 1 && isVideoImage(meaningful[0])) {
          return meaningful
        }
      }
      return child
    })
  }
  walk(tree)
}

export default rehypeUnwrapVideos
