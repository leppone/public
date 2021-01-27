import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination'

const PagingBar = ({
    // Params
    // {scores} : score container
    // {itemsPerPage} : items to show on one page
    // {setFirstIndex} : first item index on page
    scores,
    itemsPerPage,
    setFirstIndex
}) => {

    // --- States ---
    const [ active, setActive] = useState(1);


    // --- Internal functions ---
    const handleActive = (num) => {
        setActive(num);
        setFirstIndex(num*itemsPerPage-itemsPerPage);
    }


    // --- Component content ---  
    let items = [];
    for (let num = 1; num <= Math.ceil(scores.length/itemsPerPage); num++) {
      items.push(
        <Pagination.Item key={num} active={num === active} onClick={() => handleActive(num)}>
          {num}
        </Pagination.Item>
      );
    } 

    return (
        <div>
            <Pagination>
                {items}
            </Pagination>
            <br />
        </div>
    );
}

export default PagingBar;