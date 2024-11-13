import { Card } from 'antd';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import audio from '../../../public/audioWind.wav'; 

const CustomFlipCard = (props) => { 
  const {
    width = 300,
    height = 500,
    imageSrc,
    flat1Content,
    flat2Content,
    // flipInterval, 
  } = props;

  const { Meta } = Card;
  const [isFlipped, setIsFlipped] = useState(false);
//   const [flipCount, setFlipCount] = useState(0); 
  const flipSound = new Audio(audio); 

//   useEffect(() => {
//     if (flipInterval && flipCount === 0) {
//       const flipTimer = setTimeout(() => {
//         flipSound.play();
//         setIsFlipped((prev) => !prev);
//         setFlipCount(1); 
//       }, flipInterval);

//       return () => clearTimeout(flipTimer); 
//     }
//   }, [flipInterval, flipCount]);

  const handleFlip = () => {
    flipSound.play(); 
    setIsFlipped((prev) => !prev);
  };

  return (
    <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
      <Card
        hoverable
        style={{
          width: width,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          textAlign: 'center',
          height: height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 0',
        }}
        cover={
          <div style={{ position: 'relative' }}>
            <img
              alt="example"
              src={imageSrc}
              style={{
                width: '50%',
                borderRadius: '12px 12px 0 0',
                paddingTop: '20px',
                margin: '0 auto',
              }}
            />
          </div>
        }
        onClick={handleFlip} 
      >
        <Meta
          description={
            <p
              style={{
                fontSize: '16px',
                margin: '10px 0',
                paddingBottom: '20px',
              }}
            >
              {flat1Content}
            </p>
          }
        />
      </Card>

      <Card
        hoverable
        style={{
          width: width,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          textAlign: 'center',
          height: height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        onClick={handleFlip} 
      >
        <Meta
          title={
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {flat2Content.title}
            </p>
          }
          description={
            <p
              style={{
                fontSize: '16px',
                color: 'gray',
                margin: '10px 0',
              }}
            >
              {flat2Content.description}
            </p>
          }
        />
      </Card>
    </ReactCardFlip>
  );
};

export default CustomFlipCard;
