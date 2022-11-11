import SocialIcons from './SocialIcons'

const Author = () => {
  return (
    <section className="bg-back-subtle p-6 md:px-8 md:py-12 my-12 rounded-md shadow-sm">
      <h3 className="text-2xl font-bold">
        About <span className="text-accent">Stefan Kudla</span>
      </h3>
      <p className="my-4 pr-12">
        Software Developer, Music Producer, and Tech Content Creator. When
        I&apos;m not creating, you can usually find me brushing my teeth with
        coffee or looking for the best view atop a mountain.
      </p>
      <SocialIcons />
    </section>
  )
}

export default Author
