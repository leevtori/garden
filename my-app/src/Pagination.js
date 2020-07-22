import React from 'react'

const Pagination = ({dataPerPage, totalData, paginate, currentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page=item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {/* {number} */}
                            <p style={{'color': (currentPage === number)? 'red' : 'white'}}>{number}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )

}

export default Pagination;