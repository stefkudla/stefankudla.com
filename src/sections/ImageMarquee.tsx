import Marquee from '@/components/Marquee'
import SectionWrapper from '@/components/SectionWrapper'
import Image from 'next/image'
import Mockup1 from '@/assets/images/mockups/mockup-ajproperties.png'
import Mockup2 from '@/assets/images/mockups/mockup-coffeehouse.png'
import Mockup3 from '@/assets/images/mockups/mockup-oesterrtech.png'
import BusinessCard1 from '@/assets/images/mockups/mockup-stefan-business-card.png'

const ImageMarquee = () => {
  return (
    <SectionWrapper fullWidth classNames="bg-back-secondary py-36">
      <Marquee speed={24} gapBetween={8}>
        <div className="flex w-fit gap-x-8">
          <div>
            <Image
              src={Mockup1}
              width={580}
              height={512}
              alt="Design mockup of Aj Properties website made by Stefan Kudla"
              className="rounded-lg"
            />
          </div>
          <div>
            <Image
              src={Mockup2}
              width={580}
              height={512}
              alt="Design mockup of Mill Creek Coffeehouse website by Stefan Kudla"
              className="rounded-lg"
            />
          </div>
          <div>
            <Image
              src={Mockup3}
              width={580}
              height={512}
              alt="Design mockup of Oesterrtech website by Stefan Kudla"
              className="rounded-lg"
            />
          </div>
          <div>
            <Image
              src={BusinessCard1}
              width={580}
              height={512}
              alt="Business card design mockup made by Stefan Kudla"
              className="rounded-lg"
            />
          </div>
        </div>
      </Marquee>
    </SectionWrapper>
  )
}

export default ImageMarquee
