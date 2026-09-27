import Navbar from './components/Navbar';
import FounderHero from './components/FounderHero';
import About from './components/About';
import Initiatives from './components/Initiatives';
import Events from './components/Events';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden">
      <Navbar />
      <FounderHero />
      <About />
      <Initiatives />
      {/* <SuccessStories /> */}
      <Events />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
