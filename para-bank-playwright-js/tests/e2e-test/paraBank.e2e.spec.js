import { test, expect } from '@playwright/test';
import { generateUser, generateBiller, transferAmount } from '../../utils/testData.js';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { HomePage } from '../../pages/HomePage.js';
import { AccountPage } from '../../pages/AccountPage.js';
import { TransferPage } from '../../pages/TransferPage.js';
import { BillPayPage } from '../../pages/BillPayPage.js';

test('End-to-End Para Bank UI Test', async ({ page, context }) => {
  const user = generateUser(); // Make sure this comes before any usage
  
  console.log('====================== 🧪 Generated Test Data ======================');
  console.log(`👤 Name       : ${user.firstName} ${user.lastName}`);
  console.log(`🏠 Address    : ${user.address}, ${user.city}, ${user.state}, ${user.zipCode}`);
  console.log(`📞 Phone      : ${user.phone}`);
  console.log(`🧾 SSN        : ${user.ssn}`);
  console.log(`👤 Username   : ${user.username}`);
  console.log(`🔐 Password   : ${user.password}`);
  console.log('====================================================================');

  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const accountPage = new AccountPage(page);
  const transferPage = new TransferPage(page);
  const billPayPage = new BillPayPage(page);

  console.log('➡️ Navigating to registration page...');
  await registerPage.navigate();

  console.log('📝 Registering new user...');
  await registerPage.register(user);

  console.log('🔒 Logging out after registration...');
  await homePage.logOut();

  console.log('🔑 Logging in with new user credentials...');
  await loginPage.login(user.username, user.password);

  console.log('📋 Verifying navigation menu...');
  await homePage.verifyNavigationMenu();

  console.log('🏦 Opening a new savings account...');
  const accountNumber = await accountPage.openNewAccount();
  console.log('====================================================================');
  console.log(`💼 New Account Number Created: ${accountNumber}`);
  console.log('====================================================================');

  console.log('🔍 Validating Accounts Overview...');
  await accountPage.validateOverview(accountNumber);

  const cashtx = transferAmount();
  console.log(`💸 Transferring ${cashtx} from new account...`);
  const {toAccount, transCash} = await transferPage.transferFunds(accountNumber, cashtx);
  console.log('====================================================================');
  console.log(`💼 $${transCash}.00 has been transferred from account #${accountNumber} to account #${toAccount}`);
  console.log('====================================================================');

  const biller = generateBiller(); // Make sure this comes before any usage 
  console.log('====================== 🧪 Generated Test Data ======================');
  console.log(`👤 Name       : ${biller.billfirstName}`);
  console.log(`🏠 Address    : ${biller.billaddress}, ${biller.billcity}, ${biller.billstate}, ${biller.billzipCode}`);
  console.log(`📞 Phone      : ${biller.billphone}`);
  console.log(`💵 Cash       : ${biller.billcash}`);
  console.log('====================================================================');
  console.log(`💳 Paying bill of ${biller.billcash} from new account...`);

  const {account, payee, cash} = await billPayPage.payBill(accountNumber, biller);
  console.log('====================================================================');
  console.log(`Bill Payment to ${payee} in the amount of $${cash} from account ${account} was successful.`);
  console.log('====================================================================');

  // ✅ Embedded API Test: Validate the transaction via backend
  console.log('🌐 Validating transaction through API...');
  const cookies = await context.cookies();
  const loginCookie = cookies.find(c => c.name === 'JSESSIONID');
  expect(loginCookie).toBeTruthy();
  
  const response = await fetch(
    `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountNumber}/transactions/amount/${transCash}?timeout=30000`,
    {
      method: 'GET',
      headers: {
        Cookie: `JSESSIONID=${loginCookie.value}`,
      },
    }
  );
  
  expect(response.status).toBe(200);
  
  const responseBody = await response.json();
  console.log('🔁 Transaction API Full Response:', JSON.stringify(responseBody, null, 2));
  expect(Array.isArray(responseBody)).toBe(true);
  
  const transaction = responseBody[0];
  console.log('📄 First Transaction Entry:', transaction);
  
  console.log(`📌 Validating transaction ID: ${transaction.id}`);
  expect(transaction).toHaveProperty('id');
  
  console.log(`📌 Validating amount: expected=${Number(transCash)}, actual=${transaction.amount}`);
  expect(transaction).toHaveProperty('amount', Number(transCash));
  
  console.log(`📌 Validating transaction date: ${transaction.date}`);
  expect(transaction).toHaveProperty('date');
  
  console.log(`📌 Validating transaction type: expected=Debit, actual=${transaction.type}`);
  expect(transaction).toHaveProperty('type', 'Debit');
  
  console.log(`📌 Validating account ID: expected=${Number(accountNumber)}, actual=${transaction.accountId}`);
  expect(transaction).toHaveProperty('accountId', Number(accountNumber));
  
  console.log(`📌 Validating description: expected='Funds Transfer Sent', actual='${transaction.description}'`);
  expect(transaction).toHaveProperty('description', 'Funds Transfer Sent');
  
  console.log('✅ E2E test completed successfully!');
});
