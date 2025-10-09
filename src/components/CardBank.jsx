export default function CardBank({
  title = "SAVINGS BANK",
  number = "424242424242",
  createDate = "mastercard",
  color = "0,0,255",
  description = "--:--",
  redirect = true,
  isFromMoviment,
}) {
  const backgroundImage = `linear-gradient(145deg, rgba(${color},0.50) 12%, rgba(${color},0.70) 25%, rgba(${color},0.50) 62%)`;
  const background = `linear-gradient(145deg, rgba(${color},0.30) 12%, rgba(${color},0.50) 25%, rgba(${color},0.30) 62%)`;

  return (
    <a
      href={redirect ? "/savings/" + number : undefined}
      className="
        relative 
        w-[313px]
        min-w-[60px]
        min-h-[100px] 
        sm:min-w-[60px]
        md:min-h-[100px] 
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
        hover:shadow-[0_6px_6px_#ccc]
      "
    >
      <div
        className="relative flex items-center justify-center w-[313px] h-[200px] rounded-xl"
        style={{ backgroundImage }}
      >
        {/* Efecto radial decorativo */}
        <div
          className="absolute w-[50em] aspect-[1.58] rounded-xl bg-[linear-gradient(115deg,rgba(0,0,0,1)_42%,rgba(255,255,255,1)_47%,rgba(255,255,255,1)_51%,rgba(0,0,0,1)_52%)] opacity-[0.05] animate-[rotate_4s_linear_infinite] pointer-events-none z-[10] hidden peer-hover:block"
        ></div>

        <div className="w-full h-full rounded-xl">
          <div className="relative w-full h-full rounded-[0.85em] border border-transparent">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-[0.6em] shadow-[-1px_-1px_0_#ddd]">
              <p className={isFromMoviment ? "absolute top-[1.6em] left-[1.0em] text-white text-opacity-60 text-[2.2em] md:text-[2.2em] text-shadow select-none" : "absolute top-[1em] left-[1.2em] text-white text-opacity-60 text-[1.2em] md:text-[1.2em] text-shadow select-none"}>
                <b className="opacity-80 mr-1" hidden={isFromMoviment ? true : false}>/</b>{title}
              </p>
              <div className={isFromMoviment ? "select-none absolute top-[33px] md:top-[33px] left-[2.2em] md:left-[2.2rem] text-[1.1em] md:text-[1.1em] text-white text-opacity-75 text-shadow flex flex-col gap-15" : "select-none absolute top-[120px] md:top-[120px] left-[1.4em] md:left-[1.4rem] text-[1.1em] md:text-[1.1em] text-white text-opacity-75 text-shadow flex flex-col gap-2"}>
                <p>{description == null ? "--:--" : isFromMoviment ? "Saldo actual" : description}</p>
                <p >{number}</p>
              </div>
              <p className="absolute bottom-[0.75em] right-[1.8em] text-[0.9em] md:text-[0.9em] text-white text-opacity-75 text-shadow select-none">
                {createDate}
              </p>

              {/* Círculos Mastercard */}
              <div
                className="absolute bottom-[2em] md:bottom-[2em] right-[3em] md:right-[3em] md:w-[3em] md:h-[3em] h-[3.5em] w-[3.5em] rounded-full"
                style={{ background }}
              ></div>
              <div
                className="absolute bottom-[2em] md:bottom-[2em] right-[1.2em] md:w-[3em] md:h-[3em] h-[3.5em] w-[3.5em] rounded-full"
                style={{ background }}
              ></div>

              {/* Chip */}
              <div hidden={isFromMoviment ? true : false} className="absolute top-[27.5%] left-[9.50%]">
                <img
                  className="select-none w-[45px] bg-cover h-[30px] md:w-[42px] md:h-[28px]"
                  src="/assets/ChipDorado.png"
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
