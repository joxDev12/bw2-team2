import Hero from '../../components/homeComponents/Hero';
import ComeFunziona from '../../components/homeComponents/ComeFunziona';
import Feedback from '../../components/homeComponents/Feedback';
import Assistenza from '../../components/homeComponents/Assistenza';
import Newsletter from '../../components/homeComponents/Newsletter';
import BannerOrganizzatore from '../../components/homeComponents/BannerOrganizzatore';
import ListEvent from '../../components/homeComponents/ListEvent';



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
