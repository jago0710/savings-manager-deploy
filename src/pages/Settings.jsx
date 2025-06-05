import Navbar from "../components/Navbar";

export default function Settings(){
    return(
        <>
        <div className="sm:grid md:flex">
          <Navbar />
          <div className="mt-15 md:mt-0">
            <h1>SETTINGS</h1>
          </div>
        </div>
      </>
    )
}