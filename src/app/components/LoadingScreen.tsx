import { useEffect, useState } from "react";

type LoadingScreenProps = {
  loaded: boolean;
};
const LoadingScreen = ({loaded}: LoadingScreenProps) => {
    const [hide, setHide] = useState(false)
    useEffect(() => {
        if(loaded === false)
            setTimeout(() => {
                setHide(true)
            }, 1000)
    },[loaded])
    return(
        <div className={`loadingScreen ${loaded === false ? 'hidden' : ''} ${hide === true ? 'hide' : ''}`}></div>
    )
}
export default LoadingScreen