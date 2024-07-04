import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, ToastProvider } from 'vtex.styleguide'
import { CookieTable } from '../CookieTable'

import '../../../styles.global.css'

const CookieAdmin: FC = () => {
  return (
    <ToastProvider>
      <Layout
        pageHeader={
          <PageHeader
            title={<FormattedMessage id="cookie-fortune.hello-world" />}
          />
        }
      >
        <PageBlock variation="full">
          <CookieTable />
        </PageBlock>
      </Layout>
    </ToastProvider>

  )
}

export default CookieAdmin
