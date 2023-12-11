import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector , useDispatch} from 'react-redux';
import { useEffect, Fragment } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  const notification = useSelector(state=>state.ui.notification);
 useEffect(()=>{
  dispatch(fetchCartData());
 },[dispatch])
  useEffect(()=>{
    if(isInitial){
      isInitial = false;
      return ;
    }
   if(cart.changed){
    dispatch(sendCartData(cart));
   }

  },  [cart,dispatch])
  const cartisvisible = useSelector(state=>state.ui.cartIsVisible);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
     {cartisvisible && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
