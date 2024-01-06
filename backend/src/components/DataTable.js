import { CDataTable, CPagination } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

export default function DataTable({ route, items, ...attributes }) {
  const itemsPerPage = 15
  const [pages, setPages] = useState(1)
  // const history = useHistory()

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    if (items && Array.isArray(items) && items.length > 0) {
      const totalPage = parseInt(items.length / itemsPerPage) + 1
      setPages(totalPage)
    }
  }, [items])

  const pageChange = (newPage) => {
    // currentPage !== newPage && history.push(`/${route}?page=${newPage}`)
  }
  return (
    <div>
      <CDataTable
        tableFilter
        sorter
        activePage={page}
        items={items}
        itemsPerPage={itemsPerPage}
        {...attributes}
      />
      <CPagination
        activePage={page}
        onActivePageChange={pageChange}
        pages={pages}
        doubleArrows={false}
        align="center"
      />
    </div>
  )
}

DataTable.propTypes = {
  route: PropTypes.string,
  items: PropTypes.array,
}
