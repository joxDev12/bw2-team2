import Hero from '../components/Hero';
import Feedback from '../components/Feedback';
import Assistenza from '../components/Assistenza';
import Newsletter from '../components/Newsletter';
import BannerOrganizzatore from '../components/BannerOrganizzatore';


const HomePage = () => {
  return (
    <div>
      <Hero />
      <BannerOrganizzatore />
      <Feedback />
      <Assistenza />
      <Newsletter />
    </div>


  );
}

export default HomePage