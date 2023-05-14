import Logo from './Logo'

const GlassCard = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center py-20 w-full min-w-[400px] max-w-xs bg-back-primary backdrop-blur-lg border border-card-border rounded  dark:custom-shadow-md-dark custom-shadow-md">
      <Logo />
      <h2 className="text-xl md:text-2xl max-w-xl font-bold font-oswald xl:leading-[1.2] text-left uppercase">
        Stefan Kudla
      </h2>
    </div>
  )
}

export default GlassCard
