import React from 'react'
import Image from 'next/image'

interface Job {
  company: string
  link?: string
  logo: string
  duration: string
  brandColor: string
}

const jobs: Job[] = [
  {
    company: 'Euronet Worldwide',
    link: '',
    logo: '/images/logos/euronet_worldwide_logo.jpeg',
    duration: 'Sep 2024 - Present',
    brandColor: '#253E91',
  },
  {
    company: 'Strictly',
    logo: '/images/logos/strictly-logo.png',
    duration: 'Nov 2023 - Aug 2024',
    brandColor: '#00DAEE',
  },
  {
    company: 'Cosmic',
    logo: '/images/logos/cosmic-logo.png',
    duration: 'Jun 2022 - Oct 2023',
    brandColor: '#3DBFF5',
  },
  {
    company: 'Projex',
    logo: '/images/logos/projex-logo.png',
    duration: 'May 2021 - Jul 2022',
    brandColor: '#0E6AC7',
  },
]

const WorkTimeline: React.FC = () => {
  const getNextBrandColor = (index: number) => {
    console.log(jobs[index + 1].brandColor)
    return jobs[index + 1].brandColor
  }
  return (
    <div className="container mx-auto py-12">
      <h2 className="font-mono text-sm uppercase mb-4">Work History</h2>
      <div className="relative">
        {jobs.map((job, index) => (
          <div key={index} className="flex flex-col gap-y-2 md:gap-y-8">
            <div className="flex">
              <div className="flex-shrink-0 rounded flex items-center justify-center">
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={42}
                  height={42}
                  className="rounded"
                />
              </div>
              <div className="ml-4 flex flex-col md:flex-row md:gap-4 w-full md:items-center justify-between">
                <h3 className="text-xl font-semibold flex-shrink-0">
                  {job.company}
                </h3>
                <div className="hidden md:block bg-gradient-to-l from-fore-secondary to-fore-secondary/10 h-[1px] w-full rounded-full flex-shrink" />
                <p className="text-sm text-fore-subtle font-bold flex-shrink-0">
                  {job.duration}
                </p>
              </div>
            </div>
            {index !== jobs.length - 1 && (
              <div
                className="mb-2 md:mb-8 h-8 md:h-16"
                style={{
                  width: '1px',
                  borderRadius: '9999px',
                  background: `linear-gradient(to bottom, ${
                    job.brandColor
                  }, ${getNextBrandColor(index)})`,
                  marginLeft: '1.2rem',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkTimeline
