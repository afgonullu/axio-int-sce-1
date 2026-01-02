import { gql, useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';

const GET_ACTIVITIES = gql`
  query Activities($tenantId: String!) {
    activities(tenantId: $tenantId) {
      id
      title
      tenantId
    }
  }
`;

const TENANTS = [
  { id: 'default', name: 'Default University' },
  { id: 'north', name: 'North College' },
  { id: 'south', name: 'South Institute' },
];

export default function App() {
  const [tenantId, setTenantId] = useState('default');
  const tenant = useMemo(
    () => TENANTS.find((item) => item.id === tenantId),
    [tenantId]
  );

  const { data, loading, error } = useQuery(GET_ACTIVITIES, {
    variables: { tenantId: 'default' },
    fetchPolicy: 'cache-first',
  });

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Institution</p>
          <h1>Tenant Activities</h1>
        </div>
        <label className="tenant">
          <span>Current tenant</span>
          <select
            value={tenantId}
            onChange={(event) => setTenantId(event.target.value)}
          >
            {TENANTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="card">
        <div className="row">
          <div>
            <p className="label">Selected tenant</p>
            <p className="value">{tenant?.name}</p>
          </div>
          <div>
            <p className="label">Tenant ID</p>
            <p className="value code">{tenantId}</p>
          </div>
        </div>

        {loading && <p className="status">Loading activities...</p>}
        {error && (
          <p className="status error">Something went wrong: {error.message}</p>
        )}

        {data && (
          <ul className="list">
            {data.activities.map((activity) => (
              <li key={activity.id} className="list-item">
                <p className="activity-title">{activity.title}</p>
                <p className="meta">Tenant: {activity.tenantId}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
