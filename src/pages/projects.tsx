import { useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { PageMeta } from '@/components/Meta'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { getObjectsByType, getSingleObjectByType } from '@/lib/cosmic'
import Link from 'next/link'
import OutLinkIcon from '@/components/icons/OutlinkIcon'
import { Project, ProjectPageData } from '@/types/project'
import DefaultImage from '/public/images/stefan_kudla_ogImage.jpg'
import cn from 'classnames'

const Projects: NextPage<{
  singlePageData: ProjectPageData
  dynamicData: Project[]
}> = ({ singlePageData, dynamicData }) => {
  const [toggled, setToggled] = useState(true)
  console.log(singlePageData)
  const router = useRouter()
  return (
    <Layout router={{ route: router.pathname }}>
      <PageMeta
        title="Projects | Stefan Kudla"
        description="The work of Stefan Kudla"
        url="https://stefankudla.com/projects"
      />
      <section>
        <h1 className="mb-6">{singlePageData.title}</h1>
        <h2 className="text-lg mb-12">{singlePageData.metadata.subheading}</h2>
      </section>
      <section className="w-full">
        <ul className="flex flex-wrap justify-between gap-8 gap-y-12 w-full">
          {dynamicData?.map(project => (
            <li
              key={project.slug}
              className="bg-back-subtle w-fit rounded overflow-hidden shadow-lg transition-all"
            >
              <Link
                href={project.metadata.project_url}
                target="_blank"
                rel="nooopener noreferrer"
                className="relative group"
              >
                <div className="">
                  <Image
                    src={project.metadata.image?.imgix_url || DefaultImage}
                    alt={`${project.title} card image`}
                    width={400}
                    height={300}
                    className="group-hover:blur-[1rem] group-hover:brightness-50 dark:group-hover:brightness-50 transition-all duration-200 aspect-video h-auto object-cover"
                  />
                </div>
                <span className="text-lg font-semibold flex items-center justify-center gap-x-2 mx-auto absolute top-0 left-0 inset-0 w-full text-white filter-none opacity-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-200">
                  Go to project <OutLinkIcon />
                </span>
              </Link>
              <div className="p-4">
                <h2 className="text-fore-primary text-xl font-bold mt-4">
                  {project.title}
                </h2>
                <p className="text-lg text-fore-subtle">
                  {project.metadata.subheading}
                </p>
                <span className="w-full flex gap-x-2 text-sm mt-2">
                  <button
                    onClick={() => setToggled(true)}
                    className={cn(
                      'py-[2px] px-3 border-2 border-accent rounded-xl',
                      toggled
                        ? 'bg-accent text-white opacity-100'
                        : 'opacity-50 hover:opacity-75 transition-opacity'
                    )}
                    aria-label="show project info"
                  >
                    Info
                  </button>
                  <button
                    onClick={() => setToggled(false)}
                    className={cn(
                      'py-[2px] px-3 border-2 border-accent rounded-xl',
                      !toggled
                        ? 'bg-accent text-white opacity-100'
                        : 'opacity-50 hover:opacity-75 transition-opacity'
                    )}
                    aria-label="show project tech details"
                  >
                    Tech
                  </button>
                </span>
                <ul className="mt-4 ml-2">
                  {toggled
                    ? project.metadata.info?.map(info => (
                        <li
                          className="font-semibold list-inside list-disc"
                          key={info.title}
                        >
                          {info.title}
                        </li>
                      ))
                    : project.metadata.tech?.map(tech => (
                        <li
                          className="font-semibold list-inside list-disc"
                          key={tech.title}
                        >
                          {tech.title}
                        </li>
                      ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const singlePageData =
    (await getSingleObjectByType({
      type: 'projects-page',
      slug: 'projects',
    })) || []
  const data = (await getObjectsByType('projects')) || []
  return {
    props: { singlePageData: singlePageData[0], dynamicData: data },
    revalidate: 5,
  }
}

export default Projects
