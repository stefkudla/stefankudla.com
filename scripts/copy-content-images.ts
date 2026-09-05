/**
 * Copies colocated post images into `public/` and records their dimensions.
 *
 * D-08 puts a post's images next to its MDX, but `next-mdx-remote/rsc` compiles
 * MDX outside the bundler, so a colocated file can never be a static import and
 * `next/image` can't infer its size. This runs as `prebuild`: it copies each
 * image to `public/content/posts/<slug>/` and writes a manifest of width,
 * height, a blur placeholder and whether the image is animated, which
 * `src/lib/images.ts` reads at render time.
 *
 * Both the copies and the manifest are generated — gitignored, never edited.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const CONTENT_POSTS = path.join(process.cwd(), 'content', 'posts')
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'content', 'posts')
const MANIFEST = path.join(
  process.cwd(),
  'content',
  '.generated',
  'images.json'
)

const RASTER = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif'])
const VIDEO = new Set(['.mp4'])
const COPYABLE = new Set([...RASTER, ...VIDEO, '.svg'])

/** `foo.mp4` is posted by `foo.poster.webp`, written by `gif-to-video.mjs`. */
const posterFor = (name: string) => `${name.replace(/\.mp4$/i, '')}.poster.webp`

export type ImageRecord = {
  src: string
  width?: number
  height?: number
  blurDataURL?: string
  animated: boolean
  /** Public path of the poster frame. Present only for video. */
  poster?: string
}

const describe = async (file: string): Promise<Omit<ImageRecord, 'src'>> => {
  if (path.extname(file).toLowerCase() === '.svg') return { animated: false }

  // `pageHeight` is the height of one frame; `height` is every frame stacked.
  const { width, height, pageHeight, pages } = await sharp(file).metadata()
  const animated = (pages ?? 1) > 1

  // The placeholder is the first frame either way — an animated GIF blurs to a
  // still, which is what `next/image` shows before it loads.
  const blur = await sharp(file)
    .resize(16, 16, { fit: 'inside' })
    .webp({ quality: 40 })
    .toBuffer()

  return {
    width,
    height: pageHeight ?? height,
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
    animated,
  }
}

const run = async () => {
  const manifest: Record<string, ImageRecord> = {}

  if (!fs.existsSync(CONTENT_POSTS)) {
    fs.mkdirSync(path.dirname(MANIFEST), { recursive: true })
    fs.writeFileSync(MANIFEST, '{}\n')
    return
  }

  for (const slug of fs.readdirSync(CONTENT_POSTS)) {
    const postDir = path.join(CONTENT_POSTS, slug)
    if (!fs.statSync(postDir).isDirectory()) continue

    for (const name of fs.readdirSync(postDir)) {
      if (!COPYABLE.has(path.extname(name).toLowerCase())) continue

      const from = path.join(postDir, name)
      const to = path.join(PUBLIC_DIR, slug, name)
      fs.mkdirSync(path.dirname(to), { recursive: true })
      fs.copyFileSync(from, to)

      if (VIDEO.has(path.extname(name).toLowerCase())) {
        // A video's dimensions come from its poster, which is the same size by
        // construction — Vercel's build image has no ffmpeg to ask the file
        // itself, and a video without width and height shifts the page.
        const poster = posterFor(name)
        const posterPath = path.join(postDir, poster)
        if (!fs.existsSync(posterPath)) {
          throw new Error(`${slug}/${name}: no poster at ${poster}`)
        }
        const { width, height } = await sharp(posterPath).metadata()
        manifest[`${slug}/${name}`] = {
          src: `/content/posts/${slug}/${name}`,
          width,
          height,
          poster: `/content/posts/${slug}/${poster}`,
          animated: true,
        }
        continue
      }

      manifest[`${slug}/${name}`] = {
        src: `/content/posts/${slug}/${name}`,
        ...(await describe(from)),
      }
    }
  }

  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true })
  fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(
    `content images: ${
      Object.keys(manifest).length
    } copied to public/content/posts`
  )
}

run()
