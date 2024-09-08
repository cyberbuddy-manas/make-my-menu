import Navbar from '../components/Navbar';
import TopComponent from '../components/TopComponent';
import Footer from '../components/Footer';
import SecondComponent from '../components/SecondComponent';
import ThirdComponent from '../components/ThirdComponent';
import FAQ from '../components/FAQComponent';
import ThreePhotosComponent from '../components/ThreePhotosComponent';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <div className="dotted-bg">
      <Navbar />
      <TopComponent />

      <div className="text-center mt-16 px-4">
        <h2 className="font-bold text-4xl text-[#1a1a1a] dark:text-white">
          Full-Featured Next.js Starter Kit
        </h2>
        <p className="max-w-[800px] my-5 mx-auto text-[#414040] dark:text-[whitesmoke]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.
        </p>
      </div>

      <ThreePhotosComponent />

      <SecondComponent />
      <ThirdComponent />

      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
