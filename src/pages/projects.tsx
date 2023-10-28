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
import SectionWrapper from '@/components/SectionWrapper'

const Projects: NextPage<{
  singlePageData: ProjectPageData
  dynamicData: Project[]
}> = ({ singlePageData, dynamicData }) => {
  const [toggled, setToggled] = useState(true)
  const router = useRouter()
  return (
    <Layout router={{ route: router.pathname }}>
      <PageMeta
        title="Projects | Stefan Kudla"
        description="The work of Stefan Kudla"
        url="https://stefankudla.com/projects"
      />
      <SectionWrapper
        classNames="!py-0 bg-gradient-to-b from-back-primary via-back-subtle to-back-secondary"
        innerPadding
        fullWidth
      >
        <div className="max-w-screen-xl mx-auto flex flex-col items-start w-full text-start gap-y-6 py-20 px-4 lg:px-0">
          <h1 className="font-oswald font-bold">{singlePageData.title}</h1>
          <p className="text-lg max-w-md text-fore-subtle font-bold">
            {singlePageData.metadata.subheading}
          </p>
          <ul className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-8">
            {dynamicData?.map(project => (
              <li
                key={project.slug}
                className="bg-card-background border border-card-border w-fit rounded overflow-hidden shadow-lg transition-all max-w-[320px] md:max-w-none"
              >
                <Link
                  href={project.metadata.project_url}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="hover:grayscale transition-all duration-500"
                >
                  <div>
                    <Image
                      src={project.metadata.image?.imgix_url || DefaultImage}
                      alt={`${project.title} card image`}
                      width={400}
                      height={300}
                      className="transition-all duration-200 aspect-video h-auto object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-end justify-between">
                    <Link
                      href={project.metadata.project_url}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="flex items-center gap-x-2 text-sm font-bold hover:underline"
                    >
                      <h2 className="text-fore-primary text-xl font-bold">
                        {project.title}
                      </h2>
                      <OutLinkIcon />
                    </Link>
                  </div>
                  <p className="text-lg text-fore-subtle">
                    {project.metadata.subheading}
                  </p>
                  <span className="w-full flex gap-x-2 text-sm mt-2">
                    <button
                      onClick={() => setToggled(true)}
                      className={cn(
                        'py-0 px-4 border-2 border-accent rounded-lg',
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
                        'py-0 px-4 border-2 border-accent rounded-lg',
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
        </div>
      </SectionWrapper>
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
