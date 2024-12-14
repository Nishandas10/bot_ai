import Script from 'next/script';

const FeedbackPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLSdXfnsSdK4NgDRwJQSOMALYgW07AVXqS0vho-UNGuwRYI9sQg/viewform?embedded=true" 
        width="640" 
        height="600" 
        frameBorder="0" 
        style={{ overflow: 'hidden' }} 
      >
        Loading…
      </iframe>
    </div>
  );
}

export default FeedbackPage;