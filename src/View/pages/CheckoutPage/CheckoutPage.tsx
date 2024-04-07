import { useSelector } from 'react-redux';
import { RootState } from '@/Controller/redux/store/store';
import { Restaurant, OrderDish, Order, PagesType } from '@/Model/Interfaces';
import { ShoppingBagDishCard } from '@/View/components/Common/PopUps/ShoppingBagPopup/ShoppingBagPopup';
import { CompletePaymentIcon, ILSLogo } from '@/View/Photos';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateComment } from '@/Controller/redux/slices/dishOrderSlice';
import { userAPI } from '@/Model/APIs/UserAPI';
const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlePayment = async () => {
        const { email } = useSelector(
            (state: RootState) => state.signInPage
        );
        try {
            // const comment = document.getElementById('comment-input')?.nodeValue || '';
            // dispatch(updateComment(comment));
            await userAPI.addOrder(email, order);

            alert("added successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Unknown error occurred ");
            }
        }
    };
    const { order } = useSelector(
        (state: RootState) => state.dishOrderPage
    );



    const renderOrderCheckout: React.FC<{ orderArg: Order; }> = ({ orderArg }) => {

        return (
            <div className={"bag-content-new-dishes"}>
                <div className="order-title">My Order</div>
                <div className="restaurant-name">{orderArg.dishes.length > 0 && ((orderArg.dishes[0].dish.restaurant) as Restaurant).title}</div>
                <div className="dishes-list">
                    {orderArg.dishes.map((dishOrderIndex, index) => (
                        <div key={index} className="dish-item">
                            <ShoppingBagDishCard orderDish={dishOrderIndex} />
                        </div>
                    ))}
                </div>
                <div className='second-part'>
                    <div className='total-price'>
                        <div className='line' />
                        <div className="total-quantity">
                            <span className='total-txt'>{"total - "}</span>
                            <div className='ils-logo'><img className='ils-logo' src={ILSLogo} alt="ils-logo" />{orderArg.total}</div>
                        </div>
                        <div className='line' />
                    </div>
                    <div className="add-comment">
                        <input type="text" id="comment-input" placeholder="Add a comment" />
                    </div>
                    <div className="buttons">
                        <img src={CompletePaymentIcon} />
                        <button className="checkout-button" onClick={handlePayment}>Complete payment</button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className='checkout-container'>
            <div className='input-fields'>
                <div className='delivery-details'>
                    <span className='delivery-title'>delivery details</span>
                    <div className="full-name">
                        <span className='input-title'>Full Name</span>
                        <input type="text" id="full-name" placeholder={""} />
                    </div>
                    <div className="Address">
                        <span className='input-title'>Address</span>
                        <input type="text" id="address" placeholder={""} />
                    </div>
                    <div className="phone">
                        <span className='input-title'>Phone</span>
                        <input type="text" id="phone" placeholder={""} />
                    </div>
                </div>
                <div className='payment-details'>
                    <span className='delivery-title'>Payment details</span>
                    <div className="input-card">
                        <input type="text" id="card-number" placeholder={"Card Number"} />
                    </div>
                    <div className="input-card">
                        <input type="text" id="name-on-card" placeholder={"Name On Card"} />
                    </div>
                    <div className="input-card">
                        <input type="text" id="cvv" placeholder={"CVV"} />
                    </div>
                    <div className="input-card">
                        <input type="text" id="exp-date" placeholder={"Expiry Date"} />
                    </div>
                </div>
            </div>

            <div className='order-details'>
                {renderOrderCheckout({ orderArg: order })}
            </div>
        </div>
    )
}

export default CheckoutPage