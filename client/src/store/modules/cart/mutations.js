export default {
    addToCart(state, {id, title, price, picture, count, countAvailable, store}) {
        const parsedProduct = {
            id: id,
            title: title,
            price: price,
            count: count || 1,
            countAvailable: countAvailable,
            store: store
        };

        if (Object.values(parsedProduct).some(elem => !elem)) {
            console.log(parsedProduct);
            return;
        }; // Отмена если есть пустые поля
        if (state.products.find(elem => elem.id === parsedProduct.id)) return; // Отмена если продукт уже в корзине

        parsedProduct.picture = picture;
        state.products.push(parsedProduct);

        localStorage.setItem('cart', JSON.stringify(state.products));
    },

    removeFromCart(state, id) {
        const targetIndex = state.products.findIndex(elem => elem.id === id);

        if (targetIndex >= 0) {
            state.products.splice(targetIndex, 1);

            localStorage.setItem('cart', JSON.stringify(state.products));
        }
    },

    cartAddCount(state, {id, count}) {
        const targetIndex = state.products.findIndex(elem => elem.id === id);
        const targetProduct = state.products[targetIndex];

        if (targetProduct) {
            targetProduct.count += Number(count);

            if (targetProduct.count > targetProduct.countAvailable) {
                targetProduct.count = targetProduct.countAvailable;
            }
            if (targetProduct.count <= 0) {
                state.products.splice(targetIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state.products));
        }
    },

    cartSetCount(state, {id, target}) {
        const targetIndex = state.products.findIndex(elem => elem.id === id);
        const targetProduct = state.products[targetIndex];
        const targetCount = parseInt(target.value) || 0;

        if (targetProduct) {
            if (targetCount > targetProduct.countAvailable) {
                targetProduct.count = target.value = targetProduct.countAvailable;
            } else {
                targetProduct.count = target.value = targetCount;
            }

            if (targetProduct.count <= 0) {
                state.products.splice(targetIndex, 1);
            }

            localStorage.setItem('cart', JSON.stringify(state.products));
        }
    }
}