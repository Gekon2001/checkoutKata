import { LoaderRing, LoaderWrapper, LoaderOverlay } from "./styles";
import { useAppSelector } from "../../store/hooks";
import { getAdminLoading } from "../../store/admin/selectors";

const Loader = () => {
 const isAdminLoading = useAppSelector(getAdminLoading);
 return (
  isAdminLoading && (
   <LoaderOverlay>
    <LoaderWrapper>
     <LoaderRing />
    </LoaderWrapper>
   </LoaderOverlay>
  )
 );
};

export default Loader;
