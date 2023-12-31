import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData =  ()=>{
    return async(dispatch )=>{
        const fetchData = async()=>{
            const response =  await fetch("https://reduxcartbackend-default-rtdb.firebaseio.com/cart.json");
            if(!response.ok){
                console.log(response);
                throw new Error("Could not fetch Cart data!");
            }
            const data = await response.json();

            return data;
        } 
        try{
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items : cartData.items || [],
                totalQuantity : cartData.totalQuantity || 0
            }));

        }
        catch(error){
            dispatch(uiActions.showNotification({
                status : 'error',
                title : "Error",
                message : "Fetching cart data failed!"
              }))
        }
    }
}
export const sendCartData = (cart)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            status : 'pending',
            title : "Sending",
            message : "Sending Cart Data!"
          }));



           const sendRequest = async()=>{
            const response = await fetch("https://reduxcartbackend-default-rtdb.firebaseio.com/cart.json",
            {
              method : 'PUT',
              body : JSON.stringify({items : cart.items,totalQuantity : cart.totalQuantity}),
            });
            if(!response.ok){
                throw new error("Sending cart data failed")
              }
           };
           try{
           await sendRequest();

           dispatch(uiActions.showNotification({
            status : 'success',
            title : "Success",
            message : "Sent Cart Data Successfully!"
          }))

           }
           catch(error){
            dispatch(uiActions.showNotification({
                status : 'error',
                title : "Error",
                message : "Sending cart data failed!"
              }))
           }
          // const responseData = await response.json();

    }

}