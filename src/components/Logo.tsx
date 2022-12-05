import Link from 'next/link'

const Logo: React.FC = () => (
  (<Link
    href="/"
    aria-label="Website logo, go back to homepage."
    className="flex items-center border-white group focus-visible:outline-accent">

    <div className="transition ease-in-out rounded-full  hover:opacity-60 mr-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="30px"
        height="30px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        className="md:scale-125"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path d="M2110 2560 l0 -2030 70 0 70 0 0 2030 0 2030 -70 0 -70 0 0 -2030z" />
          <path d="M1790 4223 c-86 -10 -285 -55 -366 -84 -175 -62 -305 -139 -418 -248 -163 -158 -236 -335 -236 -576 0 -482 275 -767 862 -894 107 -23 284 -51 323 -51 l25 0 -2 273 -3 272 -25 3 c-74 8 -244 48 -319 74 -194 69 -270 155 -271 310 -1 225 203 381 530 405 l90 6 0 258 0 259 -77 -2 c-43 0 -94 -3 -113 -5z" />
          <path d="M2868 3697 l-478 -532 0 -562 0 -562 538 -570 537 -570 393 -1 c387 0 393 0 390 20 -2 11 -362 396 -802 856 l-798 836 29 31 c17 18 266 286 554 597 288 311 608 656 712 768 103 111 185 207 182 212 -4 6 -152 10 -393 10 l-387 0 -477 -533z" />
          <path d="M880 1804 c-129 -68 -239 -125 -244 -126 -12 -5 53 -142 106 -225 209 -322 530 -494 1017 -543 57 -5 130 -10 162 -10 l59 0 0 263 0 263 -132 17 c-275 36 -477 137 -614 307 -29 35 -65 90 -80 122 -15 32 -30 57 -33 57 -3 -1 -112 -57 -241 -125z" />
        </g>
      </svg>
    </div>

  </Link>)
)
export default Logo
