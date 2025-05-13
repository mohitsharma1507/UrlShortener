import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div
      className="container-fluid  text-white min-vh-100 d-flex align-items-center"
      style={{ backgroundColor: " #002147" }}
    >
      <div className="row w-100 p-4">
        <div className="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <img
            src="https://www.montdigital.com/admin/uploads/news/1716450326.jpg"
            alt="Url Shortener"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-6 text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold mb-3">
            Welcome to Bitly,Build stronger digital connections
          </h1>
          <p className="fs-5 mb-4">
            Use our URL shortener, QR Codes, and landing pages to engage your
            audience and connect them to the right information. Build, edit, and
            track everything inside the Bitly Connections Platform.
          </p>
          <button
            onClick={handleDashboardClick}
            className="btn btn-success mt-3"
            style={{ width: "25rem", marginLeft: "8rem" }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
