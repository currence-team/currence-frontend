import tw from 'twin.macro';

const Wrapper = tw.div`bg-white border border-black rounded-md shadow-hard-sm`;

const Banner: React.FC = (props) => {
  return <Wrapper {...props} />;
};

export default Banner;
