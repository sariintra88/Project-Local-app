import './Home.css';
import heroImage from '../assets/temple-hero.png';


function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <img src={heroImage} alt="Sacred temples in Chiang Mai" className="hero-image" />
        {/* Text content will be displayed as part of the image */}
      </div>
    </div>
  );
}

export default Home;
