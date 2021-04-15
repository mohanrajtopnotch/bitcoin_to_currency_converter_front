import create  from 'zustand'
 const CurrencyStore = create(set =>({
        currencyType:"USD",
        SetCurrencyType: 
        (param) => set(state => ({currencyType:param}))
    })
);
export default CurrencyStore;