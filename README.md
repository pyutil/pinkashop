## Simple replacement of E-shop for rare selling of few products.

This is a Javascript (Google script) application, you can host it as Google spreadsheet + Google script.

Open source.

Give me know if you use it or if you made some improvements.

- Log into your Google user account.

- Create a Google spreadsheet with Tabs (Tab names must be in cz language, because they are used in this form in current script version):

-- Objednavky (Orders), in this tab the orders from internet are collected. Write headers into Row 1: A:Time_of_order, B:Approved_to_ship, C:Time_of_shipping, D:Payment_code, E:Order, F:Amount, H:Firstname, I:Surname, J:ID_of_pickup_point(maybe_from_https://www.zasilkovna.cz/en/pick-up-points), K:Mail, L:Phone

-- Sortiment, here prepare the list of your products. Headers in Row 1: A:Shorthand(usually_single_letter), B:Product_in_your_language, C:Product_in_en, D:Price, E:Minimal_required_Post_fee. Then Rows 2-20 fill your products. For each product an <input> element will be created in the order form.

-- Konstanty (Constants). Only B3 is important: user will see number of your bank account from B3

- Then navigate to menu: Extension, Apps script.

-- Create an project and Code.gs and form.html files inside. Copy content from this repo.

-- In Project settings, Script properties entry SPREADSHEET_ID which is long string from spreadsheet URL.

-- DEPLOY the project. You will receive an script (user ordering form) URL (which is however complex and changes with each Deploy).

- You can create for free a bit.ly redirection: you will get an URL like "bit.ly/order-something" and an QR code, which links to your ordering form.

Enjoy.
