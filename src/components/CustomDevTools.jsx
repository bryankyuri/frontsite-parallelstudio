import React, { useState } from 'react';
import { useQueryClient } from 'react-query';

const CustomDevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const queries = queryClient.getQueryCache().getAll();

  const toggleDevTools = () => {
    setIsOpen(!isOpen);
  };

  const formatQueryKey = (queryKey) => {
    return Array.isArray(queryKey) ? queryKey.join(', ') : String(queryKey);
  };

  const getQueryStatus = (query) => {
    if (query.state.isFetching) return 'fetching';
    if (query.state.isError) return 'error';
    if (query.state.isSuccess) return 'success';
    return 'idle';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fetching': return '#ff9500';
      case 'error': return '#ff3333';
      case 'success': return '#00d084';
      default: return '#6b7280';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleDevTools}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#1f2937',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="React Query DevTools"
      >
        ⚡
      </button>

      {/* DevTools Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            backgroundColor: '#1f2937',
            color: 'white',
            border: '1px solid #374151',
            borderRadius: '8px',
            width: '400px',
            maxHeight: '500px',
            overflowY: 'auto',
            zIndex: 9998,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderBottom: '1px solid #374151',
              backgroundColor: '#111827',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>React Query DevTools</span>
            <button
              onClick={toggleDevTools}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: '12px' }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Queries ({queries.length})</strong>
            </div>

            {queries.length === 0 ? (
              <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                No queries found
              </div>
            ) : (
              queries.map((query, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: '#374151',
                    borderRadius: '4px',
                    border: `2px solid ${getStatusColor(getQueryStatus(query))}`,
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>
                    <strong>Key:</strong> [{formatQueryKey(query.queryKey)}]
                  </div>
                  <div style={{ marginBottom: '4px' }}>
                    <strong>Status:</strong>{' '}
                    <span style={{ color: getStatusColor(getQueryStatus(query)) }}>
                      {getQueryStatus(query)}
                    </span>
                  </div>
                  <div style={{ marginBottom: '4px' }}>
                    <strong>Last Updated:</strong>{' '}
                    {query.state.dataUpdatedAt 
                      ? new Date(query.state.dataUpdatedAt).toLocaleTimeString()
                      : 'Never'
                    }
                  </div>
                  {query.state.error && (
                    <div style={{ marginBottom: '4px', color: '#ff3333' }}>
                      <strong>Error:</strong> {query.state.error.message}
                    </div>
                  )}
                  <details style={{ marginTop: '8px' }}>
                    <summary style={{ cursor: 'pointer' }}>Data</summary>
                    <pre
                      style={{
                        marginTop: '4px',
                        padding: '8px',
                        backgroundColor: '#111827',
                        borderRadius: '4px',
                        overflow: 'auto',
                        maxHeight: '200px',
                        fontSize: '10px',
                      }}
                    >
                      {JSON.stringify(query.state.data, null, 2)}
                    </pre>
                  </details>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomDevTools;