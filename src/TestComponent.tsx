export function TestComponent() {
  return (
    <div style={{ 
      padding: '40px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Monastery360 is Loading...</h1>
      <p style={{ fontSize: '20px' }}>If you see this message, React is working!</p>
      <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
        <p>Debug Info:</p>
        <ul>
          <li>React: ✅ Working</li>
          <li>Styles: ✅ Applied</li>
          <li>Component: ✅ Rendered</li>
        </ul>
      </div>
    </div>
  );
}