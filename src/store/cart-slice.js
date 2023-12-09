import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cart',
    initialState : {
       items : [],
       totalQuantity : 0,
    },
    reducers : {
        addItemToCart(state,action){
            const newitem = action.payload;
            const existingitem = state.items.find((item)=>item.id === newitem.id);
            state.totalQuantity++;
            if(!existingitem){
            state.items.push({
                id : newitem.id,
                price : newitem.price,
                quantity : 1,
                totalPrice : newitem.price,
                name : newitem.title
            });
            }
            else{
                existingitem.quantity++;
                existingitem.totalPrice += newitem.price;
            }

        },
        removeItemFromCart(state,action){
            const id = action.payload;
            const existingitem = state.items.find(item=>item.id === id);
            state.totalQuantity--;
            if(existingitem.quantity === 1){
              state.items= state.items.filter(item=>item.id !==id);
            }
            else{
                existingitem.quantity--;
                existingitem.totalPrice -=existingitem.price;
            }

        }
    }
})

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;