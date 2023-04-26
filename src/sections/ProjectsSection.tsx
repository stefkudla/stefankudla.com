import SectionWrapper from '@/components/SectionWrapper'

const ProjectsSection = () => {
  return (
    <SectionWrapper classNames="flex flex-col items-center w-full gap-y-6">
      <h2>Featured Projects</h2>
      <p className="text-center !max-w-xl">
        I&apos;ve built custom websites with WordPress, JavaScript, and React,
        and have worked with teams of developers working on large-scale projects
        using tools like Next.js, Node.js, and Typescript. Wether working
        directly with one of my clients as a solo web developer or collaborating
        with other developers, designers, and various other teams, I always
        strive to deliver my best work.
      </p>
    </SectionWrapper>
  )
}

export default ProjectsSection
