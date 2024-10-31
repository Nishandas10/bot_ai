/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billing-settings'
import React from 'react'

type Props = {}

function Page(props: Props) {
  return (
    <>
      <InfoBar/>
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10">
        <BillingSettings/>
      </div>
    </>
  )
}

export default Page

// 3:24:40