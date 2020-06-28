import TableCell from './tableCell';


function TableRow(props) {
    const { params } = props;
  
    const generateTableRow = () => {
      const columns = [];

      for (let column = 0; column < params.numberColumn + 1; ++column) {
        columns.push(<TableCell
          params={{...params, column}}
          key={`tableCell${params.row}-${column}`}
        />);
      }

      return columns;
    }
  
    return (
      <tr style={{border: "1px solid black"}}>
        {generateTableRow()}
      </tr>
    );
  }

export default TableRow;