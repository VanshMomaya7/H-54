export const getproducts = () =>async(dispatch)=>{
    // Calling our API
    try{
        const data = await fetch("/getproducts",{
            method: "GET",
            headers:{
                "Content-Type":"appication/json"
            }
        });
        const res = await data.json();
        console.log(res);
        dispatch({type:"SUCCESS_GET_PRODUCTS", payload:res})
    }
    catch(error){
        dispatch({type:"FAIL_GET_PRODUCTS", payload:error.response})
    }
}  