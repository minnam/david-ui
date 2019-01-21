/**
 * modules/table/table-nav.jsx
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Derek Hirotsu, dhirotsu@ventanaconstruction.com
 *
 * @flow
 */
import React from 'react'
import { stylesheet } from 'typestyle'

/* Components =================================================================================== */
import Button from '../button/button'

/* <TableNav /> ================================================================================= */
const TableNav = (props: {
  count: number,
  decreasePage: () => *,
  increasePage: () => *,
  page: number
}) => {
  const {
    count,
    decreasePage,
    increasePage,
    page,
  } = props

  return (
    <div className={CLASSNAMES.tableNavBase}>
      <Button
        label='Prev'
        disabled={page <= 1}
        onClick={() => {
          decreasePage()
        }}
      />
      <div className={CLASSNAMES.tableNavPageContainer}>
        <span className={CLASSNAMES.tableNavCurrentPage}>{page || 1}</span>
        <span>{` / ${count + 1}`}</span>
      </div>
      <Button
        label='Next'
        disabled={page === count + 1}
        onClick={() => {
          increasePage()
          window.scrollTo(0, 0)
        }}
      />
    </div>
  )
}
export default TableNav

/* Styles ======================================================================================= */
const CLASSNAMES = stylesheet({
  tableNavBase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableNavPageContainer: {
    fontSize: 12,
    lineHeight: '1.5px',
    padding: '5px 10px'
  },
  tableNavCurrentPage: {
    fontWeight: 700
  }
})