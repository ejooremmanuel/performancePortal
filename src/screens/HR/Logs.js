import axios from "axios";
import React from "react";
import { BASE_URL } from "../../config";

const Logs = () => {
  const [recentActivites, setActivities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/v1/logs/`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setActivities(response.data.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div>Fetching activities...</div>
      ) : (
        <div>
          {recentActivites.slice(0, 3).map((activity) => {
            return (
              <div className="dashboard__activities__card" key={activity.id}>
                <div className="dashboard__activities__card__title">
                  <h3>{activity.title}</h3>
                </div>
                <div className="dashboard__activities__card__name">
                  <h3>{activity.description}</h3>
                </div>
                <div className="dashboard__activities__card__date">
                  <h3>{new Date(activity.createdAt).toLocaleDateString()}</h3>
                </div>
              </div>
            );
          })}
          {recentActivites.length === 0 && "No Activies yet!"}
        </div>
      )}
    </>
  );
};

export default Logs;
