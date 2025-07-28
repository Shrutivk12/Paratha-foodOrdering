const cron = require('node-cron');
const Order = require('../models/order.js')
const {sendMail} = require('../config/mailer.js');


cron.schedule('00 17 * * *', async () => {
  try {
    
    const unpaidOrders = await Order.find({ payment: false, status: { $ne: 'Cancelled' } }).populate('user');

    const emailPromises = [];
    for (const order of unpaidOrders) {
        const userEmail = order.user?.email;
        if (!userEmail) continue;
        emailPromises.push(
            sendMail(
                userEmail,
                'Payment Reminder - Order Pending',
                `Your order at Paratha of amount ₹${order.totalAmount}/- is still unpaid. Kindly complete the UPI payment.\n\nThank you!`
            )
        );
    }
    try{
      await Promise.all(emailPromises);
    }catch(err){
      console.log(err);
    }


    console.log(`[Cron] Sent ${emailPromises.length} payment reminders.`);
  } catch (err) {
    console.error('Payment reminder cron error:', err.message);
  }
});
