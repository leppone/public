const EntryRow = ({columns}) => {
    return (
        <tr>
            {columns.map((item, idx) =>
                // TODO: wildcard or restriction for long items
                <td key={idx}>{item}</td>
            )}
        </tr>
    )
};

export default EntryRow;