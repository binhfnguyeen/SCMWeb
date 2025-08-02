import cookie from 'react-cookies'

const MyCartReducer = (current, action) => {
    if (action.type === 'update') {
        let total = 0;

        let carts = cookie.load('carts') || null;
        if (carts) {
            for (let x of Object.values(carts))
                total += x['quantity'];
        }

        return total;
    }

    return current;
}

export default MyCartReducer;