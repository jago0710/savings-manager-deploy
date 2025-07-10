
export default function StatusTag({value, severity = "info", rounded, icon }){

    const getSeverity = () => {
        switch (severity) {
            case "success":
            if (rounded) {
                return "bg-green-200 rounded-full"
            } else {
                return "bg-green-200 rounded-md"
            }
            case "info":
                return "bg-cyan-200 rounded-md"
            case "warning":
                return "bg-orange-200 rounded-md"
            case "danger":
                return "bg-red-200 rounded-md"
            default:
                break;
        }
    }

    const getSeverityText = () => {
        switch (severity) {
            case "success":
                return "text-green-500 rounde-md text-xs flex flex-row py-1 px-2 gap-1 items-center"
            case "info":
                return "text-cyan-500 rounde-md text-xs flex flex-row py-1 px-2 gap-1 items-center"
            case "warning":
                return "text-orange-400 rounde-md text-xs flex flex-row py-1 px-2 gap-1 items-center"
            case "danger":
                return "text-red-500 rounde-md text-xs flex flex-row py-1 px-2 gap-1 items-center"
            default:
                break;
        }
    }

    return(
    <div className={getSeverity(severity)}>
        <div className={getSeverityText(severity)}>
            <p>{value}</p>
            <span className={icon} style={{ fontSize: '0.7rem' }}></span>
        </div>
    </div>
    )
}