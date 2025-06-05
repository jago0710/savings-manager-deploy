export default function CardBank({
  title = "SAVINGS BANK",
  number = "424242424242",
  createDate = "mastercard",
  color = "0,0,255",
  description = "...",
  redirect = true,
}) {
  const backgroundImage = `linear-gradient(150deg, rgba(${color},0.33) 12%, rgba(${color},0.43) 31%, rgba(${color},0.23) 52%)`;

  return (
    <a
      href={redirect ? "/savings/" + number : redirect}
      className="
        relative 
        w-[100%]
        aspect-[1.579] 
        h-[280px] 
        md:w-[308px] 
        md:h-[195px]
        rounded-xl 
        overflow-hidden 
        flex 
        items-center 
        justify-center 
        font-[Trebuchet_MS] 
        transition-all 
        duration-300 
        ease-in 
        hover:rotate-[1deg] 
        hover:rotate-y-[10deg] 
        hover:scale-105 
        hover:shadow-[0_9px_9px_#ddc]
      "
    >
      <div
        className="relative flex items-center justify-center w-full h-full rounded-xl"
        style={{ backgroundImage }}
      >
        {/* Efecto radial decorativo */}
        <div
          className="absolute w-[50em] aspect-[1.58] rounded-xl bg-[linear-gradient(115deg,rgba(0,0,0,1)_42%,rgba(255,255,255,1)_47%,rgba(255,255,255,1)_51%,rgba(0,0,0,1)_52%)] opacity-[0.05] animate-[rotate_4s_linear_infinite] pointer-events-none z-[1] hidden peer-hover:block"
        ></div>

        <div className="w-full h-full rounded-xl opacity-95">
          <div className="relative w-full h-full rounded-[0.85em] border border-transparent">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-[0.6em] shadow-[-1px_-1px_0_#ddd]">
              <p className="absolute top-[0.5em] left-[0.75em] text-white text-opacity-60 text-[2em] md:text-[1.25em] text-shadow select-none">
                {title}
              </p>
              <div className="select-none absolute top-[140px] md:top-[115px] left-[1.7em] md:left-[1.2rem] text-[1.7em] md:text-[1em] text-white text-opacity-75 text-shadow flex flex-col gap-2">
                <p>{description}</p>
                <p>{number}</p>
              </div>
              <p className="absolute bottom-[0.25em] right-[0.8em] text-[1.2em] md:text-[0.7em] text-white text-opacity-75 text-shadow select-none">
                {createDate}
              </p>

              {/* Círculos Mastercard */}
              <div
                className="absolute bottom-[2em] md:bottom-[1.25em] right-[2.5em] md:right-[2em] md:w-[2.5em] md:h-[2.5em] h-[3.5em] w-[3.5em] rounded-full"
                style={{ backgroundImage }}
              ></div>
              <div
                className="absolute bottom-[2em] md:bottom-[1.25em] right-[0.5em] md:w-[2.5em] md:h-[2.5em] h-[3.5em] w-[3.5em] rounded-full"
                style={{ backgroundImage }}
              ></div>

              {/* Chip */}
              <div className="absolute top-[27.5%] left-[8.25%]">
                <img
                  className="select-none w-[65px] h-[65px] md:w-[50px] md:h-[50px]"
                  src="./assets/Chip.png"
                  alt="Chip"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
