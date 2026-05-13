import Hero from '../components/Hero';
import ComeFunziona from '../components/ComeFunziona';
import Feedback from '../components/Feedback';
import Assistenza from '../components/Assistenza';
import Newsletter from '../components/Newsletter';
import BannerOrganizzatore from '../components/BannerOrganizzatore';
import ListEvent from '../components/ListEvent';



const HomePage = () => {
  return (
    <div>
      <Hero />
      <ListEvent />
      <ComeFunziona />
      <BannerOrganizzatore />
      <Feedback />
      <Assistenza />
      <Newsletter />
    </div>


  );
}

export default HomePage