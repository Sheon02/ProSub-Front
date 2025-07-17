import { useLocation } from 'react-router-dom';
import Ballpit from '../animations/Ballpit.jsx';

const OrderSuccessScreen = () => {
  const { state } = useLocation();
  
  return (
    <div style={{position: 'relative', overflow: 'hidden', minHeight: '500px', maxHeight: '500px', width: '100%'}}>
  <Ballpit
    count={100}
    gravity={0.9}
    friction={0.8}
    wallBounce={0.95}
    colors={[
    0xffffff,    // White
    0x111111,    // Shiny black (dark gray for better reflectivity)
    0x9b59b6     // Purple (similar to Spotify's brand purple)
  ]}
  materialParams={{
    metalness: 0.8,   // More reflective (for "shiny" effect)
    roughness: 0.2,   // Smoother surface
    clearcoat: 1,     // Glossy finish
    clearcoatRoughness: 0.1
  }}
    followCursor={true}
  />
</div>
  );
};

export default OrderSuccessScreen;