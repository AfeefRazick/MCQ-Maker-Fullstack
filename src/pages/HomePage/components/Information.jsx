import designurl from "/design-page.png"

export default function Information() {
  return (
    <div className=" flex h-screen w-full flex-wrap items-center justify-center sm:px-16 md:flex-nowrap md:justify-between">
      <p className="mt-10 w-4/5 text-lg md:px-16 lg:px-20 xl:px-24">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
        voluptas quam consectetur ullam iure. Commodi saepe officia quis
        cupiditate recusandae ipsam quos doloremque dolore nulla? Et corporis ad
        vitae animi!
      </p>
      {/* image-container */}
      <figure className="mt-10 w-4/5">
        <img
          loading="lazy"
          src={designurl}
          alt="design page screenshot"
          // image
          className="w-full rounded-xl shadow-[0px_2px_3px_3px_rgba(0,0,0,0.2)]"
        ></img>
      </figure>
    </div>
  )
}
