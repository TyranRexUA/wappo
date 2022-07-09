import { useWindowDimensions } from 'react-native';
import { mapSizeInBlocks } from '../constants/map';

const useSize = () => {
  const { width, height } = useWindowDimensions();
  const mapSize = Math.min((width - 20), (height - 100));
  const cellSize = mapSize / mapSizeInBlocks;
  return { mapSize, cellSize };
};

export default useSize;
