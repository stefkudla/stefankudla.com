import Layout from '@/components/Layout'
import SectionWrapper from '@/components/SectionWrapper'
import { getObjectsByType, getSingleObjectByType } from '@/lib/cosmic'
import { pageMetadata } from '@/lib/metadata'
import { Project, ProjectPageData } from '@/types/project'
import ProjectsGrid from './projects-grid'

export const revalidate = 5

export const metadata = pageMetadata({
  title: 'Projects | Stefan Kudla',
  description: 'The work of Stefan Kudla',
  url: 'https://stefankudla.com/projects',
})

const Projects = async () => {
  const singlePageData: ProjectPageData = ((await getSingleObjectByType({
    type: 'projects-page',
    slug: 'projects',
  })) || [])[0]
  const dynamicData: Project[] = (await getObjectsByType('projects')) || []

  return (
    <Layout>
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
          <ProjectsGrid dynamicData={dynamicData} />
        </div>
      </SectionWrapper>
    </Layout>
  )
}

export default Projects
