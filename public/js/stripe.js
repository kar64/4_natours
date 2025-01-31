import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51QmZTOFWRh9BZtQsDA6Id9RXYHS1fZmBrW7ACAZol2i7ItpdOLrL0pDHc8sZ7xtE5Nlwhn4ukZRWY2TmWvZCzHza00HEDk17ZG');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};