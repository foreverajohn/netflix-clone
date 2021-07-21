import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSubscription, selectUser } from '../../features/userSlice'
import db from '../../firebase'
import './PlansList.css'
import { loadStripe } from '@stripe/stripe-js'

const PlansList = () => {
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection('customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds
                    })
                    dispatch(addSubscription({
                        plan: subscription.data().role,
                        start_date: subscription.data().current_period_end.seconds,
                        end_date: subscription.data().current_period_start.seconds
                    }))
                })
            })
    }, [user.uid])

    useEffect(() => {
        db.collection('products')
            .where('active', '==', true)
            .get()
            .then(querySnapshot => {
                const products = {};
                querySnapshot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        }
                    })
                })
                setProducts(products)
            })
    }, [])

    console.log(products)
    console.log(subscription)

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add(({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            }))

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error ocurred: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe('pk_test_51JFUZPGyqdMict5dIZB6wmEhzBL30XJQrOYznDr7Q8ecDd12m4T1siuJLIA7JziAbBbFbdnYKiVMsmrgOdATebS200njXMthgd')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    return (
        <div className='plansList'>
            <br />
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                return (
                    <div className={`${isCurrentPackage && 'plansList__plan--disabled'} plansList__plan`} key={productId}>
                        <div className="plansList__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData?.prices?.priceId)} className="plansList__button">{isCurrentPackage ? "Current Package" : "Subscribe"}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansList
