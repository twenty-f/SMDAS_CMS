import companyBasicInfo from './stock_db_management/company_basic_info'
import companyFinancialInfo from './stock_db_management/company_financial_info'
import companyShareholderInfo from './stock_db_management/company_shareholder_info'
import klineGraph from './stock_db_management/kline_graph'
import transactionDataSeperate from './stock_db_management/transaction_data_seperate'

export default {
  ...companyBasicInfo,
  ...companyFinancialInfo,
  ...companyShareholderInfo,
  ...klineGraph,
  ...transactionDataSeperate
}
