import { useContext } from 'react';
import { ContextVolume } from '~/store/Contexts';

function VolumeContext() {
    const volume = useContext(ContextVolume);
    return volume;
}

export default VolumeContext;
