import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/WeatherForecast')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setForecasts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <p className="subtitle">.NET 9 API + React + SQL Server</p>

        {loading && <p>Loading data from API...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <table className="forecast-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp (°C)</th>
                <th>Temp (°F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {forecasts.map((f) => (
                <tr key={f.id}>
                  <td>{f.date}</td>
                  <td>{f.temperatureC}</td>
                  <td>{f.temperatureF}</td>
                  <td>{f.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </header>
    </div>
  );
}

export default App;
