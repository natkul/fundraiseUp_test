# fundraiseUp_test
run command before run tests:
1) npm init playwright@latest  (with default settings)
2) npm i -D @playwright/test allure-playwright
3) npm install -g allure-commandline --save-dev

to run the tests and open the report, run the command:
npx playwright test --workers 2 ; allure generate my-allure-results -o allure-report --clean ;  allure open allure-report