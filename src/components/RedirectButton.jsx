import { color } from "chart.js/helpers"

export default function RedirectButton({title, description, icon: Icon, BorderColor, backgroundColor, href}) {
    const colors = `border: 1px solid ${BorderColor}; background: ${backgroundColor};`

    return(
        <a href={href} className="border p-4 w-full rounded-md border-gray-100 hover:border-red-400 hover:shadow-gray-300 hover:shadow flex flex-row gap-5 hover:cursor-crosshair" style={{borderColor: BorderColor, background: backgroundColor}}>
            <div className="w-15 flex justify-center items-center rounded-md" style={ {backgroundColor: BorderColor}}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
                <b>{title}</b>
                <p>{description}</p>
            </div>
        </a>
    )
}