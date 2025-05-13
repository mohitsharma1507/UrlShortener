import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";
import axios from "axios";
import { Button, Table, Container } from "react-bootstrap";

const Dashboard = () => {
  const user = getCurrentUser();
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8080/api/urls/myurls", {
          withCredentials: true,
        })
        .then((res) => {
          setUrls(res.data.urls);
        })
        .catch((err) => {
          setError("Error fetching URLs.");
          console.error(err);
        });
    }
  }, [user]);
  const handleCreateUrl = () => {
    if (!originalUrl) {
      setError("Please provide an original URL.");
      return;
    }

    axios
      .post(
        "http://localhost:8080/api/urls/create",
        { originalUrl, customCode },
        { withCredentials: true }
      )
      .then((response) => {
        setUrls((prevUrls) => [...prevUrls, response.data]);
        setOriginalUrl("");
        setCustomCode("");
        setError("");
      })
      .catch((err) => {
        setError("Error creating short URL.");
        console.error(err);
      });
  };

  if (!user)
    return (
      <p className="text-center text-white">
        Please login to view your dashboard.
      </p>
    );

  return (
    <Container className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-success">
        Welcome, {user.name}!
      </h1>
      <div className="mb-4">
        <h3>Create a Short Url</h3>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Custom Short Code (Optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <Button onClick={handleCreateUrl} variant="primary" className="mb-4">
          Create Short URL
        </Button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <h3>Your Shortened URLs</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.shortCode}>
              <td>{url.originalUrl}</td>
              <td>
                <a
                  href={`http://localhost:8080/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`http://localhost:8080/${url.shortCode}`}
                </a>
              </td>
              <td>
                <img src={url.qrCode} alt="QR Code" width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {urls.length >= 4 && <p>You can only create a maximum of 4 URLs.</p>}
    </Container>
  );
};

export default Dashboard;
