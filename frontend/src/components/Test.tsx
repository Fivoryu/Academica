import { useEffect, useState } from "react";
import api from "../services/api";

export function TestConnection() {
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const startTime = Date.now();
        const response = await api.get('/test/');
        const latency = Date.now() - startTime;
        
        setMessage(response.data.message);
        setDetails(`Latencia: ${latency}ms | URL: ${api.defaults.baseURL}`);
        setStatus('success');
      } catch (error: any) {
        setStatus('error');
        setMessage('Error de conexión con el backend');
        setDetails(`URL intentada: ${api.defaults.baseURL}\n${error.message}`);
        console.error('Detalles técnicos:', {
          config: error.config,
          response: error.response,
          stack: error.stack
        });
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{
      margin: '20px',
      padding: '20px',
      border: '1px solid',
      borderColor: status === 'loading' ? 'orange' : 
                  status === 'success' ? 'green' : 'red',
      borderRadius: '8px'
    }}>
      <h3>Prueba de Conexión Backend</h3>
      <div style={{fontWeight: 'bold'}}>
        {status === 'loading' && '🔄 Probando conexión...'}
        {status === 'success' && `✅ ${message}`}
        {status === 'error' && `❌ ${message}`}
      </div>
      {details && (
        <div style={{
          marginTop: '10px',
          fontSize: '0.8em',
          color: '#666',
          whiteSpace: 'pre-wrap'
        }}>
          {details}
        </div>
      )}
    </div>
  );
}