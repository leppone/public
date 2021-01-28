const EntryRow = ({columns}) => {
    return (
        <tr>
            {columns.map((item, idx) => (
                <td key={idx}>
                    {item.length > 20 ? 
                        <span title={item}  >{item.slice(0,20) + " ..."}</span>
                        : 
                        item
                    }
                </td>
            ))}
        </tr>
    )
};

export default EntryRow;