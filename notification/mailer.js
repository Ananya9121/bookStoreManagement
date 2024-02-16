const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.host,
  port: process.env.port,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

async function sendRevenueNotification(authorName, authorRevenue) {
  const subject = 'Revenue Tracking Notification';
  const text = `Dear ${authorName},\n\n
    Your revenue details for the current month, current year, and total revenue are as follows:\n
    Current Month Revenue: ${calculateCurrentMonthRevenue(authorName)}\n
    Current Year Revenue: ${calculateCurrentYearRevenue(authorName)}\n
    Total Revenue: ${authorRevenue}\n\n
    Thank you for your contributions!\n
    Best Regards,\n
    Bookstore Team`;

  await transporter.sendMail({
    from: process.env.user,
    to: authorName, // Assuming the author's email is their username for simplicity
    subject,
    text,
  });
}

async function calculateCurrentMonthRevenue(authorName) {
  try {
    // Find the author by username
    const author = await userModel.findOne({ username: authorName, role: 'Author' });

    if (!author) {
      throw new Error('Author not found');
    }

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript

    // Calculate the start and end of the current month
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    // Query purchases made by the author within the current month
    const purchases = await purchaseHistoryModel.find({
      userId: author._id,
      purchaseDate: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Calculate the total revenue for the current month
    const currentMonthRevenue = purchases.reduce((totalRevenue, purchase) => {
      return totalRevenue + (purchase.price * purchase.quantity);
    }, 0);

    return currentMonthRevenue;
  } catch (error) {
    console.error(error);
    throw new Error('Error calculating current month revenue');
  }
}

async function calculateCurrentYearRevenue(authorName) {
  try {
    // Find the author by username
    const author = await User.findOne({ username: authorName, role: 'Author' });

    if (!author) {
      throw new Error('Author not found');
    }

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Calculate the start and end of the current year
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    // Query purchases made by the author within the current year
    const purchases = await PurchaseHistory.find({
      userId: author._id,
      purchaseDate: { $gte: startOfYear, $lte: endOfYear },
    });

    // Calculate the total revenue for the current year
    const currentYearRevenue = purchases.reduce((totalRevenue, purchase) => {
      return totalRevenue + (purchase.price * purchase.quantity);
    }, 0);

    return currentYearRevenue;
  } catch (error) {
    console.error(error);
    throw new Error('Error calculating current year revenue');
  }
}

module.exports = { sendRevenueNotification };