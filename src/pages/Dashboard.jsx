import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <div className="sm:grid md:flex">
        <Navbar />
        <div className="mt-15 md:mt-0">
          <h1>DASHBOARD</h1>
        </div>
      </div>
    </>
  );
}
