export default function CardBank({title="SAVINGS BANK",number = "424242424242", createDate = "mastercard"}) {
    return(
        <a href={"/savings/" + number }
  className="relative h-[203px] aspect-[1.579] rounded-xl overflow-hidden flex items-center justify-center font-[Trebuchet_MS] transition-all duration-300 ease-in hover:rotate-[1deg] hover:rotate-y-[10deg] hover:scale-105 hover:shadow-[0_9px_9px_#ddc]"
>
  <div class={number}
    className="relative flex items-center justify-center rounded-xl bg-[linear-gradient(115deg,rgba(0,0,0,0.33)_12%,rgba(255,255,255,0.33)_27%,rgba(255,255,255,0.33)_31%,rgba(0,0,0,0.33)_52%)]"
  >
    {/**<!-- Simulación del ::after con div adicional (Tailwind no soporta pseudo-elementos directamente) -->*/}
    <div
      className="absolute w-[50em] aspect-[1.58] rounded-xl bg-[linear-gradient(115deg,rgba(0,0,0,1)_42%,rgba(255,255,255,1)_47%,rgba(255,255,255,1)_51%,rgba(0,0,0,1)_52%)] opacity-[0.05] animate-[rotate_4s_linear_infinite] pointer-events-none z-[1] hidden peer-hover:block"
    ></div>

    <div
      className="h-[12.5em] aspect-[1.586] rounded-xl bg-black opacity-95 bg-[linear-gradient(to_right,#000,#000_0px,#000_0px,#000)] bg-[length:0px_100%]"
    >
      <div
        className="relative w-full h-full rounded-[0.85em] border border-[#bbb]  bg-[radial-gradient(circle_at_100%_100%,#ffffff_0,#ffffff_8px,transparent_8px)_0%_0%/13px_13px_no-repeat,radial-gradient(circle_at_0_100%,#ffffff_0,#ffffff_8px,transparent_8px)_100%_0%/13px_13px_no-repeat,radial-gradient(circle_at_100%_0,#ffffff_0,#ffffff_8px,transparent_8px)_0%_100%/13px_13px_no-repeat,radial-gradient(circle_at_0_0,#ffffff_0,#ffffff_8px,transparent_8px)_100%_100%/13px_13px_no-repeat,linear-gradient(#ffffff,#ffffff)_50%_50%/calc(100%-10px)_calc(100%-26px)_no-repeat,linear-gradient(#ffffff,#ffffff)_50%_50%/calc(100%-26px)_calc(100%-10px)_no-repeat,linear-gradient(135deg,rgba(3,3,3,0.5)_0%,transparent_22%,transparent_47%,transparent_73%,rgba(0,0,0,0.5)_100%)]"
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12em] aspect-[1.604] rounded-[0.6em] shadow-[-1px_-1px_0_#ddd] bg-[linear-gradient(to_right,#000,#000_0px,#000_0px,#000)] bg-[length:4px_100%]"
        >
          <p
            className="absolute top-[0.5em] left-[0.75em] text-white text-opacity-60 text-[1.25em] text-shadow select-none"
          >
            {title}
          </p>
          <p
            className="select-none absolute top-[140px] left-[1.2rem] text-[1em] text-white text-opacity-75 text-shadow"
          >
            {number}
          </p>
          <p
            className="absolute bottom-[0.25em] right-[0.8em] text-[0.75em] text-white text-opacity-75 text-shadow select-none"
          >
            {createDate}
          </p>

          {/**<!-- Círculos Mastercard --> */}
          <div
            className="absolute bottom-[1.25em] right-[2em] w-[2.5em] h-[2.5em] rounded-full bg-[linear-gradient(90deg,rgba(75,75,75,0.25)_0%,rgba(121,121,121,1)_100%)] text-white"
          ></div>
          <div
            className="absolute bottom-[1.25em] right-[0.5em] w-[2.5em] h-[2.5em] rounded-full bg-[linear-gradient(90deg,rgba(75,75,75,0.25)_0%,rgba(121,121,121,1)_100%)] text-white"
          ></div>

          {/**<!-- Chip --> */}
          <div
            className="absolute top-[27.5%] left-[8.25%]"
          >
            <img
            className="select-none"
              width="50"
              height="50"
              x="0"
              y="0"
              src="./assets/Chip.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  </div>
</a>
)
}